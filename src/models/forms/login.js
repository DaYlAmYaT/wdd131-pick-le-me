import db from '../db.js';
import bcrypt from 'bcrypt';

/**
 * Verify a plain text password against a stored bcrypt hash
 * @param {string} plainPassword - The password to verify
 * @param {string} hashedPassword - The stored password hash
 * @returns {Promise<boolean>} True if password matches, false otherwise
 */
const verifyPassword = async (plainPassword, hashedPassword) => {
    try {
        // TODO: Use bcrypt.compare() to verify the password
        const result = await bcrypt.compare(plainPassword, hashedPassword);
        // Return the result (true/false)
        return result;

    } catch (error) {
        console.error('Error verifying password:', error);
        return false;
    }
};

export { verifyPassword };