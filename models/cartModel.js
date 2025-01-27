const pool = require('../config/db');

const Cart = {
    create: async (id) => {
        const result = await pool.query(
            'INSERT INTO carts (users_id) VALUES $1 RETURNING id',
            id
        );
        return result.rows[0];
    },

    findById: async (cartId) => {
        const result = await pool.query(
            'SELECT * FROM carts WHERE id = $1',
            cartId
        );
        return result.rows[0];
    },
    
    addProduct: async (productId) => {
        const result = await pool.query(
            'INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *',
            [cartId, productId, quantity, price]
        );
        return result.rows[0];
    },

    updateProductQuantity: async (cartId, productId, quantity) => {
        const result = await pool.query(
            'UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *',
            [quantity, cartId, productId]
        );
        return result.rows[0];
    },

    removeProduct: async (cartId, productId) => {
        const result = await pool.query(
            'DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2 RETURNING *',
            [cartId, productId]
        );
        return result.rows[0];
    },
};

module.exports = Cart;