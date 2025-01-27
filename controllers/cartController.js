const Cart = require('../models/cartModel');

const createCart = async (req, res) => {
    const { userId } = req.body;

    try {
        const cart = await Cart.create(userId);
        res.status(201).json({
            message: 'Cart created successfully',
            cart: cart,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating cart', error });
    }
};

const addProductToCart = async (req,res) => {
    const { cartId } = req.params;
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const price = await getProductPrice(productId);

        const newProduct = await Cart.addProduct(cartId, productId, quantity, price);

        res.status(201).json({
            message: 'Product added to cart',
            product: newProduct,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product to cart', error });
    }
};

const getCartItems = async (req, res) => {
    const { cartId } = req.params;

    try {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const items = await Cart.getItems(cartId);
        res.json({ items });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart items', error });
    }
};

const updateProductQuantity = async (req, res) => {
    const { cartId } = req.params;
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const updatedProduct = await Cart.updateProductQuantity(cartId, productId, quantity);
        res.json({
            message: 'Product quantity updated',
            product: updatedProduct,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product quantity', error });
    }
};

const removeProductFromCart = async (req, res) => {
    const { cartId } = req.params;
    const { productId } = req.body;

    try {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const removedProduct = await Cart.removeProduct(cartId, productId);
        res.json({
            message: 'Product removed from cart',
            product: removedProduct,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error removing product from cart', error });
    }
};

module.exports = {
    createCart,
    addProductToCart,
    getCartItems,
    updateProductQuantity,
    removeProductFromCart,
};