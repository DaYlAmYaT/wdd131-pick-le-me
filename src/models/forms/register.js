import db from '../db.js';
import bcrypt from 'bcrypt';

/**
 * Hash a plain text password using bcrypt
 * @param {string} plainPassword - The password to hash
 * @returns {Promise<string|null>} The hashed password or null if failed
 */
const hashPassword = async (plainPassword) => {
    try {
        // TODO: Use bcrypt.hash() with the password and salt rounds of 10
        const hashedPassword = await bcrypt.hash(plainPassword, 10);
        // Return the hashed password
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        return null;
    }
};

/**
 * Check if an email address is already registered
 * @param {string} email - Email to check
 * @returns {Promise<boolean>} True if email exists, false otherwise
 */
const emailExists = async (email) => {
    try {
        // TODO: Write a query using COUNT(*) to check if email exists
        // TODO: Use $1 as placeholder for the email parameter
        const query = 'SELECT COUNT(*) FROM users WHERE email = $1';
        // TODO: Execute the query with [email] parameter array
        const result = await db.query(query, [email]);
        // TODO: Return true if count > 0, false otherwise
        // HINT: result.rows[0].count will be a string, convert to number
        return parseInt(result.rows[0].count) > 0;

    } catch (error) {
        console.error('DB Error in emailExists:', error);
        return false; // Safe fallback - assume email doesn't exist
    }
};

export { 
    hashPassword, 
    emailExists, 
};