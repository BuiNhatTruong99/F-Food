const Blog = require("../models/blog");
const asyncHandler = require("express-async-handler");

class BlogController {
    // POST : create a new blog
    createBlog = asyncHandler(async (req, res) => {
        const { name, content, category } = req.body;
        if (!name || !content || !category) throw new Error("Missing inputs");
        const response = await Blog.create(req.body);
        res.status(200).json({
            success: response ? true : false,
            newBlog: response ? response : "Cannot create new blog",
        });
    });

    // PUT : update a blog
    updateBlog = asyncHandler(async (req, res) => {
        const { bid } = req.params;
        if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
        const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true });
        res.status(200).json({
            success: response ? true : false,
            updatedBlog: response ? response : "Cannot update blog",
        });
    });

    // DELETE : delete a blog
    deleteBlog = asyncHandler(async (req, res) => {
        const { bid } = req.params;
        const response = await Blog.findByIdAndDelete(bid);
        res.status(200).json({
            success: response ? true : false,
            deletedBlog: response ? response : "Cannot delete blog",
        });
    });

    // GET : get all blogs
    getAllBlogs = asyncHandler(async (req, res) => {
        const response = await Blog.find({});
        res.status(200).json({
            success: response ? true : false,
            blogs: response ? response : "Cannot get blogs",
        });
    });

    /** 
     *  GET : get a blog by id
     *  increment numsViews by 1 each time user view a blog
     *  populate => join table (like inner join in sql)
    */
    getBlog = asyncHandler(async (req, res) => {
        const { bid } = req.params;
        const blog = await Blog.findByIdAndUpdate(bid, { $inc: { numsViews: 1 } }, { new: true })
            .populate("likes dislikes", "firstname lastname ");
        res.status(200).json({
            success: blog ? true : false,
            blog
        });
    });

    /**
     *  when user click to reaction a blog
     *  1. check if user has already reacted to this blog => if yes, toggle the reaction
     */

    // PUT : like a blog
    likedBlog = asyncHandler(async (req, res) => {
        const { _id } = req.payload;
        const { bid } = req.params;
        const likedBlog = await Blog.findById(bid);
        if (!likedBlog) {
            throw new Error("Cannot find blog");
        }

        // Check if user has already disliked this blog
        const hasDislike = likedBlog.dislikes.find(
            (dislike) => dislike.toString() === _id
        );
        if (hasDislike) {
            // Remove user from dislikes
            await Blog.findByIdAndUpdate(
                bid,
                { $pull: { dislikes: _id } },
                { new: true }
            );
        }

        // Check if user has already liked this blog
        const isLiked = likedBlog.likes.find((like) => like.toString() === _id);
        if (isLiked) {
            // Remove user from likes
            const response = await Blog.findByIdAndUpdate(
                bid,
                { $pull: { likes: _id } },
                { new: true }
            );
            res.status(200).json({
                success: true,
                message: `User ${_id} removed from likes`,
                response,
            });
        } else {
            // Add user to likes
            const response = await Blog.findByIdAndUpdate(
                bid,
                { $push: { likes: _id } },
                { new: true }
            );
            res.status(200).json({
                success: true,
                message: `User ${_id} add to likes`,
                response,
            });
        }
    });

    dislikesBlog = asyncHandler(async (req, res) => {
        const { _id } = req.payload;
        const { bid } = req.params;
        const dislikedBlog = await Blog.findById(bid);
        if (!dislikedBlog) {
            throw new Error("Cannot find blog");
        }

        // Check if user has already liked this blog
        const hasLiked = dislikedBlog.likes.find((like) => like.toString() === _id);
        if (hasLiked) {
            // Remove user from likes
            await Blog.findByIdAndUpdate(
                bid,
                { $pull: { likes: _id } },
                { new: true }
            );
        }

        // Check if user has already disliked this blog
        const isDisliked = dislikedBlog.dislikes.find(
            (dislike) => dislike.toString() === _id
        );
        if (isDisliked) {
            // Remove user from dislikes
            const response = await Blog.findByIdAndUpdate(
                bid,
                { $pull: { dislikes: _id } },
                { new: true }
            );
            res.status(200).json({
                success: true,
                message: `User ${_id} removed from dislikes`,
                response,
            });
        } else {
            // Add user to dislikes
            const response = await Blog.findByIdAndUpdate(
                bid,
                { $push: { dislikes: _id } },
                { new: true }
            );
            res.status(200).json({
                success: true,
                message: `User ${_id} add to dislikes`,
                response,
            });
        }
    });

    uploadBlogImage = asyncHandler(async (req, res) => {
        const { bid } = req.params;
        if (!req.file) throw new Error("No image sent");
        const updateBlog = await Blog.findByIdAndUpdate(bid, { image: req.file.path }, { new: true });
        res.status(200).json({
            status: updateBlog ? true : false,
            data: updateBlog ? updateBlog : "Cannot update product",
        });
    });
}

module.exports = new BlogController();
