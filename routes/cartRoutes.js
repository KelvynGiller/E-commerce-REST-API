const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/', cartController.createCart);

router.post('/:cartId', cartController.addProductToCart);

router.get('/:cartId', cartController.getCartItems);

router.put('/:cartId', cartController.updateProductQuantity);

router.delete('/:cartId', cartController.removeProductFromCart);

module.exports = router;