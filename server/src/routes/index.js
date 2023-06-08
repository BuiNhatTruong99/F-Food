const userRoute = require('./user');
const productRoute = require('./product');
const categoryRoute = require('./productCategory');
const blogcategoryRoute = require('./blogCategory');
const blogRoute = require('./blog');
const couponRoute = require('./coupon');
const { notFound, errorHandler } = require('../middlewares/errHandle')

function route(app) {
    app.use('/api/user', userRoute);
    app.use('/api/product', productRoute);
    app.use('/api/productcategory', categoryRoute);
    app.use('/api/blogcategory', blogcategoryRoute);
    app.use('/api/blog', blogRoute);
    app.use('/api/coupon', couponRoute);

    // check if route is not found
    app.use(notFound);
    app.use(errorHandler);
}

module.exports = route;