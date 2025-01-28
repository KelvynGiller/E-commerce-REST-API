const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');


router.post('/', orderController.createOrder);


router.get('/:user_id', orderController.getOrdersByUserId);


router.get('/:orderId', orderController.getOrderById);


router.put('/:orderId/status', orderController.updateOrderStatus);


router.delete('/:orderId', orderController.deleteOrder);

module.exports = router;