/*
    custom message for error
*/

// return status error : not found
const notFound = (req, res, next) => {
    const error = new Error(`Route - ${req.originalUrl} - Not Found`);
    res.status(404);
    next(error);
};

// if status : 200 but error is there => set status to 500 (db error)
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;// set status to 500 (db error)
    return res.status(statusCode).json({
        success: false,
        message: err?.message,
    });

};

module.exports = { notFound, errorHandler };
