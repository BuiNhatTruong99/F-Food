const express = require("express");
const router = express.Router();
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

const ProductCategoryController = require("../controllers/productCategoryController");

router.get("/", ProductCategoryController.getAllProductCategories);
// router.get('/:pcid', ProductCategoryController.getProductCategory);
router.post(
  "/",
  [verifyAccessToken, isAdmin],
  ProductCategoryController.createProductCategory
);
router.put(
  "/:pcid",
  [verifyAccessToken, isAdmin],
  ProductCategoryController.updateProductCategory
);
router.delete(
  "/:pcid",
  [verifyAccessToken, isAdmin],
  ProductCategoryController.deleteProductCategory
);

module.exports = router;
