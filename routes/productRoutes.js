const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

//Get all products
router.get('/', productController.getAllProducts);

//Get products by id
router.get('/', productController.getProductById);

//Get products by category
router.get('/', productController.getProductsByCategory);

module.exports = router;