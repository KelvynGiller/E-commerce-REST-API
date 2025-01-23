const Product = require('../models/productModel');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: 'Products search error', error}) 
    }
};
