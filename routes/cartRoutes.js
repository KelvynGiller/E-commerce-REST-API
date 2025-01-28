const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');

router.post('/', cartController.createCart);

router.post('/:cart_id', cartController.addProductToCart);

router.get('/:cart_id', cartController.getCartItems);

router.put('/:cart_id', cartController.updateProductQuantity);

router.delete('/:cart_id/product', cartController.removeProductFromCart);

router.post('/:cart_id/checkout', orderController.checkout);

module.exports = router;