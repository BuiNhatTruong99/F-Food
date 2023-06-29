const express = require("express");
const router = express.Router();
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploadCloud = require("../config/cloudinary.config");

const productController = require("../controllers/productController");

router.post("/", [verifyAccessToken, isAdmin], productController.createProduct);
router.get("/", productController.getAllProducts);
router.put("/ratings", verifyAccessToken, productController.ratingProduct);
router.put(
  "/:pid",
  [verifyAccessToken, isAdmin],
  productController.updateProduct
);

router.put(
  "/uploadimage/:pid",
  [verifyAccessToken, isAdmin],
  uploadCloud.fields([
    { name: "thumb", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  productController.uploadProductImage
);

router.delete(
  "/:pid",
  [verifyAccessToken, isAdmin],
  productController.deleteProduct
);
router.get("/:pid", productController.getProduct);

module.exports = router;
