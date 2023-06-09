const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

class ProductController {
  // POST : create a new product
  createProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error("No data sent");
    if (req.body && req.body.name) req.body.slug = slugify(req.body.name);
    const newProduct = await Product.create(req.body);
    res.status(200).json({
      status: newProduct ? "success" : "fail",
      data: newProduct ? newProduct : "Cannot create product",
    });
  });

  // GET : get one product
  getProduct = asyncHandler(async (req, res) => {
    // get id product from params
    const { pid } = req.params;
    const product = await Product.findById(pid).populate({
      path: "ratings",
      populate: { path: "postedBy", select: "firstname lastname avatar" },
    });
    res.status(200).json({
      status: product ? true : false,
      data: product ? product : "Cannot find product",
    });
  });

  // GET : get all products
  getAllProducts = asyncHandler(async (req, res) => {
    // Search key : mongodb-query-of-advanced-filtering-sorting-limit-field-and-pagination-with-mongoose
    //BUILD QUERY
    // 1A) Deleting excluded fields from queryObj
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]); //delete all excludedFields from queryObj

    //1B) Advanced filtering
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    const formattedQuery = JSON.parse(queryString);

    // Filtering
    if (req.query.name)
      formattedQuery.name = { $regex: req.query.name, $options: "i" };
    let queryCommand = Product.find(formattedQuery);

    // 2) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queryCommand = queryCommand.sort(sortBy);
    }

    //3) Field Limiting
    // Select pattern  .select("firstParam secondParam"), it will only show the selected field, add minus sign for excluding (include everything except the given params)
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queryCommand = queryCommand.select(fields);
    } else {
      queryCommand = queryCommand.select("-__v");
    }

    // 4) Pagination
    // page=2&limit=10, 1-10 page 1, 11-20 page 2, 21-30 page 3
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || process.env.LIMIT_PER_PAGE;
    const skip = (page - 1) * limit;

    queryCommand = queryCommand.skip(skip).limit(limit);

    //EXECUTE QUERY
    const product = await queryCommand.exec();
    const counts = await Product.find(formattedQuery).countDocuments();

    res.status(200).json({
      status: product ? true : false,
      counts,
      products: product ? product : "Cannot find products",
    });
  });

  // PUT : update a product
  updateProduct = asyncHandler(async (req, res) => {
    // get id product from params
    const { pid } = req.params;
    // check if req.body is empty
    if (Object.keys(req.body).length === 0) throw new Error("No data sent");
    // if change name => change slug
    if (req.body && req.body.name) req.body.slug = slugify(req.body.name);
    const updateProd = await Product.findByIdAndUpdate(pid, req.body, {
      new: true,
    });
    res.status(200).json({
      status: updateProd ? true : false,
      data: updateProd ? updateProd : "Cannot update product",
    });
  });

  // DELETE : delete a product
  deleteProduct = asyncHandler(async (req, res) => {
    // get id product from params
    const { pid } = req.params;
    const deleteProd = await Product.findByIdAndDelete(pid);
    res.status(200).json({
      status: deleteProd ? true : false,
      data: deleteProd ? deleteProd : "Cannot delete product",
    });
  });

  // PUT : Rating a product
  /**
   * - check login -> only login can rating
   * - chose product to rating -> rating product
   */
  ratingProduct = asyncHandler(async (req, res) => {
    const { _id } = req.payload; // get user id from token
    const { star, comment, pid, updatedAt } = req.body;
    if (!star || !pid) throw new Error("Missing data");
    // find product to rating
    const ratingProduct = await Product.findById(pid);
    // check if user already rating this product
    const hadRating = ratingProduct?.ratings?.find(
      (element) => element.postedBy.toString() === _id.toString()
    );
    if (hadRating) {
      // update rating
      await Product.updateOne(
        {
          ratings: { $elemMatch: hadRating },
        },
        {
          // set new star and comment
          $set: {
            "ratings.$.star": star,
            "ratings.$.comment": comment,
            "ratings.$.updatedAt": updatedAt,
          },
        },
        { new: true }
      );
    } else {
      // add rating to product
      await Product.findByIdAndUpdate(
        pid,
        {
          // push rating to ratings array
          $push: { ratings: { star, comment, postedBy: _id, updatedAt } },
        },
        { new: true }
      );
    }

    // - Sum rating
    const totalRatingProduct = await Product.findById(pid);
    // get count of rating of this product
    const ratingLength = totalRatingProduct.ratings.length;
    // sum all star of this product
    const sumRating = totalRatingProduct.ratings.reduce(
      (sum, cur) => sum + cur.star,
      0
    );
    // calculate average rating
    totalRatingProduct.totalRating =
      Math.round((sumRating * 10) / ratingLength) / 10;
    await totalRatingProduct.save();
    return res.status(200).json({
      status: true,
      totalRatingProduct,
    });
  });

  // PUT : Upload image
  uploadProductImage = asyncHandler(async (req, res) => {
    const { pid } = req.params;

    if (!req.files) {
      throw new Error("No images sent");
    }

    let thumbImage;
    let images = [];
    if (req.files.thumb && req.files.thumb.length > 0) {
      thumbImage = req.files.thumb[0].path;
    }
    if (req.files.images && req.files.images.length > 0) {
      images = Array.from(req.files.images).map((file) => file.path);
    }
    const updateProd = await Product.findByIdAndUpdate(
      pid,
      { thumb: thumbImage, $push: { images: { $each: images } } },
      { new: true }
    );

    res.status(200).json({
      status: updateProd ? true : false,
      data: updateProd ? updateProd : "Cannot update product",
    });
  });
  /**
    uploadProductImage = asyncHandler(async (req, res) => {
      const { pid } = req.params;
      if (!req.files) throw new Error("No image sent");
      const updateProd = await Product.findByIdAndUpdate(
        pid,
        { $push: { images: { $each: req.files.map((file) => file.path) } } },
        { new: true }
      );
      res.status(200).json({
        status: updateProd ? true : false,
        data: updateProd ? updateProd : "Cannot update product",
      });
    });
    */
}

module.exports = new ProductController();
