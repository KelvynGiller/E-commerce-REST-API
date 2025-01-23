const Product = require('../models/productModel');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: 'Products search error', error}) 
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not find' });
        }
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: 'Product search error', error})
    }
};

