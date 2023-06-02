const userRoute = require('./user');
const { notFound, errorHandler } = require('../middlewares/errHandle')

function route(app) {
    app.use('/api/user', userRoute);

    // check if route is not found
    app.use(notFound);
    app.use(errorHandler);
}

module.exports = route;