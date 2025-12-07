import db from '../db.js';

export const getAllPaddles = async (sortBy) => {
    try {
        // Validate sortBy parameter - only allow these 6 field names
        const validSortFields = ['price-up', 'price-down', 'alphabet', 'power', 'control', 'spin'];
        if (!validSortFields.includes(sortBy)) {
            sortBy = 'alphabet'; // Default to department if invalid
        }
        // Map sortBy to actual database columns
        let orderByClause;
        switch (sortBy) {
            case 'price-up':
                orderByClause = 'price';
                break;
            case 'price-down':
                orderByClause = 'price DESC';
                break;
            case 'alphabet':
                orderByClause = 'paddle_name';
                break;
            case 'power':
                orderByClause = 'power';
                break;
            case 'control':
                orderByClause = 'control';
                break;
            case 'spin':
                orderByClause = 'spin';
                break;
            default:
                orderByClause = 'paddle_name';
        }
        
        const query = `
            SELECT p.id, p.paddle_name, b.brand_name as brand_name, 
                   p.power, p.control, p.spin, p.price,
                   p.description, p.image
            FROM paddle p
            INNER JOIN brand b
            ON p.brand_id = b.id
            ORDER BY ${orderByClause}
        `;

        const result = await db.query(query);

        return result.rows.map(paddle => ({
            id: paddle.id,
            name: paddle.paddle_name,
            brand: paddle.brand_name,
            price: paddle.price,
            power: paddle.power,
            control: paddle.control,
            spin: paddle.spin,
            description: paddle.description,
            image: paddle.image
        }));
    } catch (error) {
        console.error('Error getting all paddles:', error.message);
        return [];
    };
};

export const getPaddleById = async (id) => {
    try {
        const query = `
            SELECT p.id, p.paddle_name, b.brand_name as brand_name, 
                   p.power, p.control, p.spin, p.price,
                   p.description, p.image
            FROM paddle p
            INNER JOIN brand b
            ON p.brand_id = b.id
            WHERE p.id = ${id}
        `;

        const result = await db.query(query);

        if (result.rows.length === 0) {
            return {};
        }

        const paddle = result.rows[0];

        return {
            id: paddle.id,
            name: paddle.paddle_name,
            brand: paddle.brand_name,
            price: paddle.price,
            power: paddle.power,
            control: paddle.control,
            spin: paddle.spin,
            description: paddle.description,
            image: paddle.image
        }
    } catch (error) {
        console.error('Error getting paddle by ID', error.message);
        return {};
    };
};

export const getPaddlesByBrand = async (brand) => {
    try {
        const query = `
                SELECT p.id, p.paddle_name, b.brand_name as brand_name, 
                    p.power, p.control, p.spin, p.price,
                    p.description, p.image
                FROM paddle p
                INNER JOIN brand b
                ON p.brand_id = b.id
                WHERE b.brand_name = ${brand}
            `;

        const result = await db.query(query);

        if (result.row.length === 0) {
            return [];
        }

        return result.rows.map(paddle => ({
            id: paddle.id,
            name: paddle.paddle_name,
            brand: paddle.brand_name,
            price: paddle.price,
            power: paddle.power,
            control: paddle.control,
            spin: paddle.spin,
            description: paddle.description,
            image: paddle.image
        }));
    } catch (error) {
        console.error('Error getting paddles by brand', error.message);
        return [];
    };
};

export const getTop10Paddles = async (category='power') => {
    try {
        const query = `
                SELECT id, paddle_name, image
                FROM paddle
                ORDER BY ${category} DESC
                LIMIT 10
            `;

        const result = await db.query(query);
        let rank = 1;
        return result.rows.map(paddle => ({
            id: paddle.id,
            name: paddle.paddle_name,
            image: paddle.image,
            rank: rank++
        }));
    } catch (error) {
        console.error('Error getting top 10 paddles', error.message);
        return [];
    };
};

// export default { getAllPaddles, getPaddleById, getPaddlesByBrand, getTop10Paddles };