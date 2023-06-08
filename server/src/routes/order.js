const express = require('express');
const router = express.Router();
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
const uploadCloud = require('../config/cloudinary.config');

const orderController = require('../controllers/orderController');

router.post('/', verifyAccessToken, orderController.createOrder);

module.exports = router;