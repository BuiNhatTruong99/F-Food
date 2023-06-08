const Order = require('../models/Order');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

class OrderController {
    // POST : create a new order
    createOrder = asyncHandler(async (req, res) => {
        const { _id } = req.payload;
        const { coupon } = req.body;
        const userCart = await User.findById(_id).select('cart').populate('cart.product', 'name price');
        // get each product [idprod, quantity] item in cart 
        const products = await userCart?.cart.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
        }));
        // sum total price of all products in cart
        const total = await userCart?.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        // if user has coupon, apply discount
        if (coupon) total = Math.round(total * (1 - coupon / 100) * 1000);
        const newOrder = await Order.create({ products, total, orderedBy: _id }); // create new order
        return res.status(200).json({
            success: newOrder ? true : false,
            data: newOrder ? newOrder : 'Something went wrong',
            userCart
        });
    });

}

module.exports = new OrderController();