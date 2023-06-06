const userRoute = require('./user');
const productRoute = require('./product');
const { notFound, errorHandler } = require('../middlewares/errHandle')

function route(app) {
    app.use('/api/user', userRoute);
    app.use('/api/product', productRoute);

    // check if route is not found
    app.use(notFound);
    app.use(errorHandler);
}

module.exports = route;