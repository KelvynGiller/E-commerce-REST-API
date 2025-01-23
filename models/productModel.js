const pool = require('../config/db');

const getAllProducts = async () => {
    const result = await pool.query('SELECT * from products');
    return result.rows;
};

