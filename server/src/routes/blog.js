const express = require('express');
const router = express.Router();
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

const blogController = require('../controllers/blogController');

router.get('/', blogController.getAllBlogs);
router.get('/:bid', blogController.getBlog);
router.post('/', [verifyAccessToken, isAdmin], blogController.createBlog);
router.put('/update/:bid', [verifyAccessToken, isAdmin], blogController.updateBlog);
router.put('/like/:bid', verifyAccessToken, blogController.likedBlog);
router.put('/dislike/:bid', verifyAccessToken, blogController.dislikesBlog);
router.delete('/delete/:bid', [verifyAccessToken, isAdmin], blogController.deleteBlog);


module.exports = router;