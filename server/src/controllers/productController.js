const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

class ProductController {

    // POST : create a new product
    createProduct = asyncHandler(async (req, res) => {
        if (Object.keys(req.body).length === 0) throw new Error('No data sent');
        if (req.body && req.body.name) req.body.slug = slugify(req.body.name);
        const newProduct = await Product.create(req.body);
        res.status(200).json({
            status: newProduct ? 'success' : 'fail',
            data: newProduct ? newProduct : 'Cannot create product'
        });
    });

    // GET : get one product
    getProduct = asyncHandler(async (req, res) => {
        // get id product from params
        const { pid } = req.params;
        const product = await Product.findById(pid);
        res.status(200).json({
            status: product ? true : false,
            data: product ? product : 'Cannot find product'
        });
    });

    // GET : get all products
    getAllProducts = asyncHandler(async (req, res) => {
        const products = await Product.find();
        res.status(200).json({
            status: products ? true : false,
            data: products ? products : 'Cannot find any product'
        });
    });

    // PUT : update a product
    updateProduct = asyncHandler(async (req, res) => {
        // get id product from params
        const { pid } = req.params;
        // check if req.body is empty
        if (Object.keys(req.body).length === 0) throw new Error('No data sent');
        // if change name => change slug
        if (req.body && req.body.name) req.body.slug = slugify(req.body.name);
        const updateProd = await Product.findByIdAndUpdate(pid, req.body, { new: true });
        res.status(200).json({
            status: updateProd ? true : false,
            data: updateProd ? updateProd : 'Cannot update product'
        });
    });

    // DELETE : delete a product
    deleteProduct = asyncHandler(async (req, res) => {
        // get id product from params
        const { pid } = req.params;
        const deleteProd = await Product.findByIdAndDelete(pid);
        res.status(200).json({
            status: deleteProd ? true : false,
            data: deleteProd ? deleteProd : 'Cannot delete product'
        });
    });

}

module.exports = new ProductController;