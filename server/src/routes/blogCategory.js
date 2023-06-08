const express = require('express');
const router = express.Router();
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

const BlogCategoryController = require('../controllers/blogCategoryController');

router.get('/', BlogCategoryController.getAllBlogCategories);
// router.get('/:pcid', BlogCategoryController.getProductCategory);
router.post('/', [verifyAccessToken, isAdmin], BlogCategoryController.createBlogCategory);
router.put('/:bid', [verifyAccessToken, isAdmin], BlogCategoryController.updateBlogCategory);
router.delete('/:bid', [verifyAccessToken, isAdmin], BlogCategoryController.deleteBlogCategory);



module.exports = router;