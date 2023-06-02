const User = require("../models/User");


class UserController {
    // POST : register
    register(req, res, next) {
        const response = User.create(req.body)
            .then((user) => {
                return res.status(200).json({
                    sucess: response ? true : false,
                    response: user,
                });
            })
            .catch(next);
    }

}

module.exports = new UserController();