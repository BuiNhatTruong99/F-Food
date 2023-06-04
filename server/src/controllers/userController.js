const User = require("../models/User");
const {
    generateAccessToken,
    generateRefreshToken,
} = require("../middlewares/jwt");

class UserController {
    // POST : register
    async register(req, res, next) {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(500).json({
                sucess: false,
                message: "Email already exists",
            });
        } else {
            const newUser = User.create(req.body)
                .then((user) => {
                    return res.status(200).json({
                        sucess: newUser ? true : false,
                        message: user ? "User created" : "Something went wrong",
                    });
                })
                .catch(next);
        }
    }

    // POST : login
    async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                sucess: false,
                message: "Please provide email and password",
            });
        }
        try {
            /**
             * refresh token => provide new access token
             * access token => verify user
             */

            const response = await User.findOne({ email });
            if (response && (await response.comparePassword(password))) {
                // distructure password and role from response
                const { password, role, ...userData } = response.toObject();
                // generate access token
                const accessToken = generateAccessToken(userData._id, role);
                // generate refresh token
                const refreshToken = generateRefreshToken(userData._id);
                // save refresh token in database
                await User.findByIdAndUpdate(
                    userData._id,
                    { refreshToken },
                    { new: true }
                );
                // save refresh token in cookie
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });
                return res.status(200).json({
                    sucess: true,
                    accessToken,
                    userData,
                });
            } else {
                return res.status(400).json({
                    sucess: false,
                    message: "Invalid credentials",
                });
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    getCurrent(req, res, next) {
        const { _id } = req.payload;
        const user = User.findById(_id).select("-password -refreshToken -role")
            .then((user) => {
                return res.status(200).json({
                    success: true,
                    response: user ? user : "User not found",
                });
            })
            .catch(next);
    }
}

module.exports = new UserController();
