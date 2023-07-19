const express = require("express");
const router = express.Router();
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

const couponController = require("../controllers/couponController");

router.get("/", couponController.getAllCoupons);
router.post("/getcoupon", couponController.getCoupon);
router.post("/", [verifyAccessToken, isAdmin], couponController.createCoupon);
router.put(
  "/:cid",
  [verifyAccessToken, isAdmin],
  couponController.updateCoupon
);
router.delete(
  "/:cid",
  [verifyAccessToken, isAdmin],
  couponController.deleteCoupon
);

module.exports = router;
