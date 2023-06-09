const Coupon = require('../models/Coupon');
const asyncHandler = require('express-async-handler');

class CouponController {
    /**
     * POST : create a new coupon
     * input num of days to expiry date (expiry) => convert to miliseconds => sum to current date
     */
    createCoupon = asyncHandler(async (req, res) => {
        const { name, discount, expiry } = req.body;
        if (!name || !discount || !expiry) throw new Error("Missing inputs");
        const response = await Coupon.create({
            ...req.body,
            expiry: Date.now() + 24 * 60 * 60 * 1000 * expiry,
        });
        res.status(200).json({
            success: response ? true : false,
            newCoupon: response ? response : "Cannot create new coupon",
        });
    });

    // PUT : update a coupon
    updateCoupon = asyncHandler(async (req, res) => {
        const { cid } = req.params;
        if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
        if (req.body.expiry) req.body.expiry = Date.now() + req.body.expiry * 24 * 60 * 60 * 1000;
        const response = await Coupon.findByIdAndUpdate(cid, req.body, { new: true });
        res.status(200).json({
            success: response ? true : false,
            updatedCoupon: response ? response : "Cannot update coupon",
        });

    });

    // DELETE : delete a coupon
    deleteCoupon = asyncHandler(async (req, res) => {
        const { cid } = req.params;
        const response = await Coupon.findByIdAndDelete(cid);
        res.status(200).json({
            success: response ? true : false,
            deletedCoupon: response ? response : "Cannot delete coupon",
        });
    });

    // GET : get all coupons
    getAllCoupons = asyncHandler(async (req, res) => {
        const response = await Coupon.find();
        res.status(200).json({
            success: response ? true : false,
            coupons: response ? response : "Cannot get coupons",
        });
    });
}

module.exports = new CouponController;