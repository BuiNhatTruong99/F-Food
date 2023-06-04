const jwt = require('jsonwebtoken');

const verifyAccessToken = (req, res, next) => {
    if (!req?.headers?.authorization?.startsWith("Bearer")) {
        return res.status(401).json({
            sucess: false,
            message: "Require access token",
        });
    } else {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                return res.status(401).json({
                    sucess: false,
                    message: "Invalid access token",
                });
            } else {
                req.payload = payload;
                next();
            }
        });
    }

}

module.exports = {
    verifyAccessToken
}