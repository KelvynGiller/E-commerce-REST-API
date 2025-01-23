const pool = require('../config/db');

const getAllProducts = async () => {
    const result = await pool.query('SELECT * from products');
    return result.rows;
};

const getProductById = async (id) => {
    const result = await pool.query('SELECT * from products WHERE id=$1')
    return result.rows[0];
};

