const BlogCategory = require('../models/BlogCategory');
const asyncHandler = require('express-async-handler');

class BlogCategoryController {
    // POST : create a new blog
    createBlogCategory = asyncHandler(async (req, res) => {
        const newBlogCategory = await BlogCategory.create(req.body);
        res.status(200).json({
            status: newBlogCategory ? true : false,
            data: newBlogCategory ? newBlogCategory : "Cannot create blog category",
        });
    });

    // GET : get all blog categories
    getAllBlogCategories = asyncHandler(async (req, res) => {
        const blogCategories = await BlogCategory.find().select('name _id');
        res.status(200).json({
            status: blogCategories ? true : false,
            data: blogCategories ? blogCategories : "Cannot get blog categories",
        });
    });

    // GET : get a blog category
    // getBlogCategory = asyncHandler(async (req, res) => {
    //     const { bid } = req.params;
    //     const BlogCategory = await BlogCategory.findById(bid);
    //     res.status(200).json({
    //         status: BlogCategory ? true : false,
    //         data: BlogCategory ? BlogCategory : "Cannot get blog category",
    //     });
    // });

    // PUT : update a blog category
    updateBlogCategory = asyncHandler(async (req, res) => {
        if (Object.keys(req.body).length === 0) throw new Error("Missing input");
        const updateBlogCategory = await BlogCategory.findByIdAndUpdate(req.params.bid, req.body, { new: true });
        res.status(200).json({
            status: updateBlogCategory ? true : false,
            data: updateBlogCategory ? updateBlogCategory : "Cannot update blog category",
        });
    });

    // DELETE : delete a blog category   
    deleteBlogCategory = asyncHandler(async (req, res) => {
        const deleteBlogCategory = await BlogCategory.findByIdAndDelete(req.params.bid);
        res.status(200).json({
            status: deleteBlogCategory ? true : false,
            data: deleteBlogCategory ? deleteBlogCategory : "Cannot delete blog category",
        });
    });
}

module.exports = new BlogCategoryController();