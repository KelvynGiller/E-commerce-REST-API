const pool = require('../config/db');

const getAllProducts = async () => {
    const result = await pool.query('SELECT * from products');
    return result.rows;
};

const getProductById = async (id) => {
    const result = await pool.query('SELECT * from products WHERE id = $1', [id]);
    return result.rows[0];
};

const getProductsByCategory = async (categoryId) => {
    const result = await pool.query('SELECT * from products WHERE categoryId = $1', [categoryId]);
    return result.rows;
};