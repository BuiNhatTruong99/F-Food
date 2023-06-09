const express = require('express');
const router = express.Router();
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
const uploadCloud = require('../config/cloudinary.config');

const orderController = require('../controllers/orderController');

router.get('/', verifyAccessToken, orderController.getAllOrdersByUser);
router.get('/admin', [verifyAccessToken, isAdmin], orderController.getAllOrdersByAdmin);
router.post('/', verifyAccessToken, orderController.createOrder);
router.put('/status/:oid', [verifyAccessToken, isAdmin], orderController.updateStatus);

module.exports = router;