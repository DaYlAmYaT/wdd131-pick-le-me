import db from './db.js';
// import setupPracticeDatabase from './practice-setup.js';

// SQL to create the brand table if it doesn't exist
const createBrandTableIfNotExists = `
    CREATE TABLE IF NOT EXISTS brand (
        id INTEGER PRIMARY KEY,
        brand_name VARCHAR(30) UNIQUE NOT NULL,
    )
`;

// SQL to create the paddle table if it doesn't exist
const createPaddleTableIfNotExists = `
    CREATE TABLE IF NOT EXISTS paddle (
        id INTEGER PRIMARY KEY,
        paddle_name VARCHAR(255) UNIQUE NOT NULL,
        brand_id INTEGER NOT NULL,
        power NUMERIC(3, 1),
        spin NUMERIC(3, 1),
        control NUMERIC(3, 1),
        price NUMERIC(5, 2),
        description TEXT,
        image VARCHAR(255),
        FOREIGN KEY (brand_id) REFERENCES brand(id),
    )
`;

/**
 * Creates a URL-friendly slug from one or more strings by converting to lowercase,
 * replacing spaces with hyphens, and removing special characters.
 *
 * @param {...string} strings - One or more strings to convert into a slug
 * @returns {string} A URL-friendly slug with only lowercase letters, numbers, and hyphens
 */
const createSlug = (...strings) => {
    return strings
        .filter((str) => {
            return str && typeof str === 'string';
        }) // Remove null/undefined/non-string values
        .join(' ') // Join all strings with spaces
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/[^a-z0-9\-]/g, '') // Remove special characters except hyphens
        .replace(/-+/g, '-') // Replace multiple consecutive hyphens with single hyphen
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
};

// Insert faculty data into the faculty table
const insertFaculty = async(facultyMember, verbose = true) => {
    const slug = createSlug(facultyMember.firstName, facultyMember.lastName);

    // Use the id directly from the data
    const { departmentId } = facultyMember;
    if (departmentId === undefined || departmentId === null) {
        throw new Error(`Faculty ${facultyMember.firstName} ${facultyMember.lastName}: departmentId is required`);
    }

    const query = `
      INSERT INTO faculty (first_name, last_name, office, phone, email, department_id, title, gender, slug)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (slug) DO UPDATE SET
        first_name    = EXCLUDED.first_name,
        last_name     = EXCLUDED.last_name,
        office        = EXCLUDED.office,
        phone         = EXCLUDED.phone,
        email         = EXCLUDED.email,
        department_id = EXCLUDED.department_id,
        title         = EXCLUDED.title,
        gender        = EXCLUDED.gender,
        updated_at    = CURRENT_TIMESTAMP
      RETURNING id, first_name, last_name, slug;
    `;

    const values = [
        facultyMember.firstName,
        facultyMember.lastName,
        facultyMember.office,
        facultyMember.phone,
        facultyMember.email,
        departmentId,
        facultyMember.title,
        facultyMember.gender,
        slug
    ];

    const result = await db.query(query, values);

    if (result.rows.length > 0 && verbose) {
        console.log(`Created/Updated faculty member: ${result.rows[0].first_name} ${result.rows[0].last_name}`);
    }

    return result.rows[0];
};

// Check if all four tables are present in the current schema
const allTablesExist = async() => {
    const tables = ['brand', 'paddle'];
    const res = await db.query(
        `
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = ANY($1)
        `,
        [tables]
    );
    return res.rowCount === tables.length;
};

// Check if the last course, last faculty, and last catalog entry already exist
const lastSeedRowsExist = async() => {
    // Last course -> check by slug
    const lastCourse = courses[courses.length - 1];
    const lastCourseSlug = createSlug(lastCourse.courseCode);
    const courseExists = await db.query(`SELECT 1 FROM courses WHERE slug = $1 LIMIT 1`, [lastCourseSlug]);

    if (courseExists.rowCount === 0) return false;

    // Last faculty -> check by slug derived from first/last name
    const lastFaculty = faculty[faculty.length - 1];
    const lastFacultySlug = createSlug(lastFaculty.firstName, lastFaculty.lastName);
    const facultyExists = await db.query(`SELECT 1 FROM faculty WHERE slug = $1 LIMIT 1`, [lastFacultySlug]);

    if (facultyExists.rowCount === 0) return false;

    // Last catalog entry -> check by its conflict key
    const lastCatalog = catalog[catalog.length - 1];
    const catalogExists = await db.query(
        `SELECT 1
        FROM catalog
        WHERE course_slug = $1 AND faculty_slug = $2 AND time = $3 AND room = $4
        LIMIT 1`,
        [lastCatalog.courseSlug, lastCatalog.facultySlug, lastCatalog.time, lastCatalog.room]
    );

    return catalogExists.rowCount > 0;
};

// Check if the database has been initialized already
const isAlreadyInitialized = async(verbose = true) => {
    if (verbose) {
        console.log('Checking existing schema & seed…');
    }

    const tablesOk = await allTablesExist();
    if (!tablesOk) {
        return false;
    }

    const rowsOk = await lastSeedRowsExist();
    return rowsOk;
};

/**
 * Sets up the database by creating tables and inserting initial data.
 * This function should be called when the server starts.
 */
const setupDatabase = async() => {
    const verbose = process.env.ENABLE_SQL_LOGGING === 'true';

    try {
        // Skip everything if schema + last seed rows are present
        // if (await isAlreadyInitialized(verbose)) {
        //     //setupPracticeDatabase(verbose);
        //     if (verbose) console.log('DB already initialized — skipping setup.');
        //     return true;
        // }

        if (verbose) console.log('Setting up database…');

        // // 1) Departments first (schema + data)
        // await db.query(create);
        // for (const department of departments) {
        //     await insertDepartment(department, verbose);
        // }

        // // 2) Catalog (schema + data)
        // await db.query(createCatalogTableIfNotExists);
        // for (const entry of catalog) {
        //     await insertCatalogEntry(entry, verbose);
        // }

        // // // 3) Courses (schema + data)
        // // await db.query(createCoursesTableIfNotExists);
        // // for (const course of courses) {
        // //     await insertCourse(course, verbose);
        // // }

        // // 4) Faculty (schema + data)
        // await db.query(createFacultyTableIfNotExists);
        // for (const facultyMember of faculty) {
        //     await insertFaculty(facultyMember, verbose);
        // }

        if (verbose) {
            // setupPracticeDatabase(verbose);
            console.log('Database setup complete');
        }
        return true;
    } catch (error) {
        console.error('Error setting up database:', error.message);
        throw error;
    }
};

/**
 * Tests the database connection by executing a simple query.
 */
const testConnection = async() => {
    try {
        const result = await db.query('SELECT NOW() as current_time');
        console.log('Database connection successful:', result.rows[0].current_time);
        return true;
    } catch (error) {
        console.error('Database connection failed:', error.message);
        throw error;
    }
};

export { setupDatabase, testConnection };