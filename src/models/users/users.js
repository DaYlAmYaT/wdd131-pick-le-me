import db from '../db.js';

const getAllUsers = async () => {
    try {        
        const query = `
            SELECT 
                users.id,
                users.name,
                users.email,
                users.created_at,
                roles.role_name
            FROM users
            INNER JOIN roles ON users.role_id = roles.id
            ORDER BY users.id
        `;

        const result = await db.query(query);

        return result.rows;
    } catch (error) {
        console.error('Error getting all users:', error.message);
        return [];
    };
};

const getUserById = async (id) => {
    try {
        const query = `
            SELECT 
                users.id,
                users.name,
                users.email,
                users.created_at,
                roles.role_name
            FROM users
            INNER JOIN roles ON users.role_id = roles.id
            WHERE users.id = $1
        `;

        const result = await db.query(query, [id]);
        return result.rows[0] || null;
    } catch (error) {
        console.error('DB Error in getUserById:', error);
        return null;
    }
};

const getUserByEmail = async (email) => {
    try {
        // TODO: Write SELECT query for id, name, email, password, created_at
        // TODO: Use LOWER() on both sides for case-insensitive email comparison
        // TODO: Use $1 placeholder for email parameter
        // TODO: Add LIMIT 1 to ensure only one result
        const query = `
            SELECT 
                users.id, 
                users.name, 
                users.email, 
                users.password, 
                users.created_at,
                roles.role_name
            FROM users
            INNER JOIN roles ON users.role_id = roles.id
            WHERE LOWER(users.email) = LOWER($1)
            LIMIT 1
        `;

        // TODO: Execute query and return first row or null
        const result = await db.query(query, [email]);
        return result.rows[0] || null;

    } catch (error) {
        console.error('DB Error in findUserByEmail:', error);
        return null;
    }
};

const updateUser = async (id, name, email) => {
    try {
        const query = `
            UPDATE users 
            SET name = $1, email = $2, updated_at = CURRENT_TIMESTAMP
            WHERE id = $3
            RETURNING id, name, email, updated_at
        `;

        const result = await db.query(query, [name, email, id]);
        return result.rows[0] || null;
    } catch (error) {
        console.error('DB Error in updateUser:', error);
        return null;
    }
};

const saveUser = async (name, email, password) => {
    try {
        // TODO: Hash the password using hashPassword function
        const hashedPassword = await hashPassword(password);
        const query = `
            INSERT INTO users (name, email, password, role_id)
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, email, created_at, updated_at
        `;

        // TODO: Execute the query with the parameters and return the user data
        // HINT: Use the hashed password, not the plain text password
        const result = await db.query(query, [name, email, hashedPassword, 1]);
        return result.rows[0] || null;

    } catch (error) {
        console.error('DB Error in saveUser:', error);
        return null;
    }
};

const deleteUser = async (id) => {
    try {
        const query = 'DELETE FROM users WHERE id = $1';
        const result = await db.query(query, [id]);
        return result.rowCount > 0;
    } catch (error) {
        console.error('DB Error in deleteUser:', error);
        return false;
    }
};


const grantPermission = async (id) => {
    try {
        const query = `
            UPDATE users 
            SET role_id = 3
            WHERE id = $1
            RETURNING role_id
        `;

        const result = await db.query(query, [id]);
        console.log(result)
        return result.rows[0] || null;
    } catch (error) {
        console.error('DB Error in grantPermission:', error);
        return null;
    }
};

const revokePermission = async (id) => {
    try {
        const query = `
            UPDATE users 
            SET role_id = 1
            WHERE id = $1
            RETURNING role_id
        `;

        const result = await db.query(query, [id]);
        console.log(result)
        return result.rows[0] || null;
    } catch (error) {
        console.error('DB Error in revokePermission:', error);
        return null;
    }
}

export { getAllUsers, getUserById, getUserByEmail, grantPermission, revokePermission, saveUser, updateUser, deleteUser };