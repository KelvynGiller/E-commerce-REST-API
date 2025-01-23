const pool = require('../config/db');

const createUser = async (username, email, hashedPassword) => {
    const result = await pool.query(
        'INSERT INTO user (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, hashedPassword]
    );
    return result.rows[0];
};