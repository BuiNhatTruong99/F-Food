const ProductCategory = require("../models/ProductCategory");
const asyncHandler = require("express-async-handler");

class ProductCategoryController {
  // POST : create a new product
  createProductCategory = asyncHandler(async (req, res) => {
    const newProductCategory = await ProductCategory.create(req.body);
    res.status(200).json({
      status: newProductCategory ? true : false,
      data: newProductCategory
        ? newProductCategory
        : "Cannot create product category",
    });
  });

  // GET : get all product categories
  getAllProductCategories = asyncHandler(async (req, res) => {
    const productCategories = await ProductCategory.find().select(
      "name _id icon"
    );
    res.status(200).json({
      status: productCategories ? true : false,
      data: productCategories
        ? productCategories
        : "Cannot get product categories",
    });
  });

  // GET : get a product category
  // getProductCategory = asyncHandler(async (req, res) => {
  //     const { pcid } = req.params;
  //     const productCategory = await ProductCategory.findById(pcid);
  //     res.status(200).json({
  //         status: productCategory ? true : false,
  //         data: productCategory ? productCategory : "Cannot get product category",
  //     });
  // });

  // PUT : update a product category
  updateProductCategory = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error("Missing input");
    const updateProductCategory = await ProductCategory.findByIdAndUpdate(
      req.params.pcid,
      req.body,
      { new: true }
    );
    res.status(200).json({
      status: updateProductCategory ? true : false,
      data: updateProductCategory
        ? updateProductCategory
        : "Cannot update product category",
    });
  });

  // DELETE : delete a product category
  deleteProductCategory = asyncHandler(async (req, res) => {
    const deleteProductCategory = await ProductCategory.findByIdAndDelete(
      req.params.pcid
    );
    res.status(200).json({
      status: deleteProductCategory ? true : false,
      data: deleteProductCategory
        ? deleteProductCategory
        : "Cannot delete product category",
    });
  });
}

module.exports = new ProductCategoryController();
