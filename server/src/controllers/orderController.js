const Coupon = require('../models/Coupon');
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
        const products = await userCart?.cart?.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
        }));
        // sum total price of all products in cart
        let total = userCart?.cart?.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        const orderData = { products, total, orderedBy: _id };
        // if user has coupon, apply discount
        if (coupon) {
            const selectCoupon = await Coupon.findById(coupon);
            total = Math.round(total * (1 - (selectCoupon?.discount / 100))) || total;
            orderData.coupon = coupon;
            orderData.total = total;
        }
        const newOrder = await Order.create(orderData); // create new order
        return res.status(200).json({
            success: newOrder ? true : false,
            data: newOrder ? newOrder : 'Something went wrong',
            userCart
        });
    });

    // PUT : update status of an order
    updateStatus = asyncHandler(async (req, res) => {
        const { oid } = req.params;
        const { status } = req.body;
        if (!status) throw new Error('Status is missing');
        const response = await Order.findByIdAndUpdate(oid, { status }, { new: true });
        return res.status(200).json({
            success: response ? true : false,
            data: response ? response : 'Something went wrong',
        });
    });

    // GET : get all orders
    getAllOrdersByUser = asyncHandler(async (req, res) => {
        const { _id } = req.payload;
        const response = await Order.find({ orderedBy: _id }).populate('products.product', 'name price');
        return res.status(200).json({
            success: response ? true : false,
            data: response ? response : 'Something went wrong',
        });
    });

    // GET : get all orders By Admin
    getAllOrdersByAdmin = asyncHandler(async (req, res) => {
        const response = await Order.find();
        return res.status(200).json({
            success: response ? true : false,
            data: response ? response : 'Something went wrong',
        });
    });

}

module.exports = new OrderController();