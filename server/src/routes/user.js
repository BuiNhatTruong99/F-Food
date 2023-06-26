const express = require("express");
const router = express.Router();
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/current", verifyAccessToken, userController.getCurrent);
router.post("/refresh", userController.refreshAccessToken);
router.get("/logout", userController.logout);
router.get("/forgotpassword", userController.forgotPassword);
router.put("/resetpassword", userController.resetPassword);
router.get("/", [verifyAccessToken, isAdmin], userController.getAllUser);
router.delete("/", [verifyAccessToken, isAdmin], userController.deleteUser);
router.put("/current", verifyAccessToken, userController.updateUser);
router.put("/address", verifyAccessToken, userController.updateUserAddress);
router.put("/cart", verifyAccessToken, userController.updateUserCart);
router.put(
  "/:_id",
  [verifyAccessToken, isAdmin],
  userController.updateUserByAdmin
);

module.exports = router;
