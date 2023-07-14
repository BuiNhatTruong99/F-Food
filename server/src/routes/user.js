const express = require("express");
const router = express.Router();
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

const userController = require("../controllers/userController");
const uploadCloud = require("../config/cloudinary.config");

router.post("/register", userController.register);
router.get("/verifyregister/:token", userController.verifyRegister);
router.post("/login", userController.login);
router.get("/current", verifyAccessToken, userController.getCurrent);
router.post("/refresh", userController.refreshAccessToken);
router.get("/logout", userController.logout);
router.post("/forgotpassword", userController.forgotPassword);
router.put("/resetpassword", userController.resetPassword);
router.get("/", [verifyAccessToken, isAdmin], userController.getAllUser);
router.delete("/", [verifyAccessToken, isAdmin], userController.deleteUser);
router.put("/current", verifyAccessToken, userController.updateUser);
router.put("/address", verifyAccessToken, userController.updateUserAddress);
router.put("/cart", verifyAccessToken, userController.updateUserCart);
router.put(
  "/cart/remove",
  verifyAccessToken,
  userController.removeItemFromCart
);
router.put("/wishlist", verifyAccessToken, userController.updateUserWishlist);
router.put(
  "/wishlist/remove",
  verifyAccessToken,
  userController.removeItemFromWishlist
);
router.put(
  "/:_id",
  [verifyAccessToken, isAdmin],
  userController.updateUserByAdmin
);
router.put(
  "/uploadavatar/:uid",
  verifyAccessToken,
  uploadCloud.single("user-avatar"),
  userController.updateUserAvatar
);

module.exports = router;
