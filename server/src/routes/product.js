const express = require('express');
const router = express.Router();
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

const productController = require('../controllers/productController');

router.post('/', [verifyAccessToken, isAdmin], productController.createProduct);
router.get('/', productController.getAllProducts);
router.put('/ratings', verifyAccessToken, productController.ratingProduct);
router.put('/:pid', [verifyAccessToken, isAdmin], productController.updateProduct);
router.delete('/:pid', [verifyAccessToken, isAdmin], productController.deleteProduct);
router.get('/:pid', productController.getProduct);



module.exports = router;