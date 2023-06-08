const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const {
    generateAccessToken,
    generateRefreshToken,
} = require("../middlewares/jwt");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const crypto = require("crypto");

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

    /**
     * Login =>
     *  - refresh token => provide new access token
     *  - access token => verify user
     */

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
            const response = await User.findOne({ email });
            if (response && (await response.comparePassword(password))) {
                // distructure password and role from response
                const { password, role, refreshToken, ...userData } =
                    response.toObject();
                // generate access token
                const accessToken = generateAccessToken(userData._id, role);
                // generate refresh token
                const newRefreshToken = generateRefreshToken(userData._id);
                // save refresh token in database
                await User.findByIdAndUpdate(
                    userData._id,
                    { refreshToken },
                    { new: true } // new ? true => show document after update : false => show document before update
                );
                // save refresh token in cookie
                res.cookie("refreshToken", newRefreshToken, {
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
                message: error.message,
            });
        }
    }

    // Get : Current user
    getCurrent(req, res, next) {
        const { _id } = req.payload;
        User.findById(_id)
            .select("-password -refreshToken -role") // select all field except password, refreshToken, role
            .then((user) => {
                return res.status(200).json({
                    success: user ? true : false,
                    response: user ? user : "User not found",
                });
            })
            .catch(next);
    }

    // Post : refresh token
    async refreshAccessToken(req, res) {
        const cookie = req.cookies; // get token from cookie
        // check token valid or not
        if (!cookie && !cookie.refreshToken) {
            return res.status(400).json({
                success: false,
                message: "No refresh token in cookie",
            });
        }
        // verify token
        try {
            const checkToken = jwt.verify(
                cookie.refreshToken,
                process.env.JWT_SECRET
            );
            // check token in database
            const response = await User.findOne({
                _id: checkToken._id,
                refreshToken: cookie.refreshToken,
            });
            return res.status(200).json({
                success: response ? true : false, // if response => true else false
                accessToken: response
                    ? generateAccessToken(response._id, response.role)
                    : "Refresh token not match",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    // Get : logout
    async logout(req, res) {
        // get token from cookie
        const cookie = req.cookies;
        if (!cookie || !cookie.refreshToken) {
            return res.status(400).json({
                success: false,
                message: "No refresh token in cookie",
            });
        }
        try {
            // set refresh token to empty string
            await User.findOneAndUpdate(
                { refreshToken: cookie.refreshToken },
                { refreshToken: "" },
                { new: true }
            );
            // delete refresh token in cookie
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: true,
            });
            return res.status(200).json({
                success: true,
                message: "Logout success",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    /**
     *  Client send request to server
     *  => server check mail exist or not => if exist => send mail to user
     *  => user click link in mail => redirect to api and get token
     *  => server check token valid or not => if valid => update password
     */

    // Post : forgot password
    async forgotPassword(req, res) {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Missing email",
            });
        }
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "Email not found",
                });
            }
            const resetToken = user.createPasswordChangeToken(); // create token
            await user.save();
            // create mail content
            const html = `Please click on the link below to change your password. This link will expire in 10 minutes from now
            . <a href="${process.env.URL_SERVER}/api/user/reset-password/${resetToken}">Click here</a>`;
            const data = {
                email,
                html,
            };
            // send mail
            const rs = await sendMail(data);
            return res.status(200).json({
                success: true,
                rs,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    // Put : reset password
    async resetPassword(req, res, next) {
        // get token from body
        const { token, password } = req.body;
        if (!token || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing token or password",
            });
        }
        try {
            // hash token
            const passwordResetToken = crypto
                .createHash("sha256")
                .update(token)
                .digest("hex");
            // check token in database
            const user = await User.findOne({
                passwordResetToken,
                passwordResetExpires: { $gt: Date.now() },
            });
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "Token invalid or expired",
                });
            }
            // update password
            user.password = password;
            user.passwordResetToken = undefined; // set token to undefined
            user.passwordResetExpires = undefined; // set token expire time to undefined
            user.passwordChangeAt = Date.now(); // set password change time
            await user.save();
            return res.status(200).json({
                success: true,
                message: user ? "Password changed" : "Something went wrong",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    // GET : get all user
    async getAllUser(req, res) {
        const response = await User.find().select("-password -refreshToken -role");
        return res.status(200).json({
            success: response ? true : false,
            user: response,
        });
    }

    // DELETE : delete user
    async deleteUser(req, res) {
        const { _id } = req.query;
        try {
            if (!_id) {
                return res.status(400).json({
                    success: false,
                    message: "Missing id",
                });
            }
            const response = await User.findByIdAndDelete(_id);
            return res.status(200).json({
                success: response ? true : false,
                deleteUser: response ? `User deleted : ${response.email}` : "User not found",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    // PUT : update user - user role
    async updateUser(req, res) {
        const { _id } = req.payload;
        if (!_id || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Missing input",
            });
        }
        try {
            const { role, ...data } = req.body;
            const response = await User.findByIdAndUpdate(_id, data, { new: true }).select("-password -refreshToken -role");
            return res.status(200).json({
                success: response ? true : false,
                updateUser: response ? response : "Something went wrong",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    // PUT : update user - admin role
    async updateUserByAdmin(req, res) {
        const { _id } = req.params;
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Missing input",
            });
        }
        try {
            const response = await User.findByIdAndUpdate(_id, req.body, { new: true }).select("-password -refreshToken -role");
            return res.status(200).json({
                success: response ? true : false,
                updateUser: response ? response : "Something went wrong",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    // PUT : update address
    updateUserAddress = asyncHandler(async (req, res) => {
        const { _id } = req.payload;
        if (!req.body.address) throw new Error("Missing address");
        const response = await User.findByIdAndUpdate(_id, { $push: { address: req.body.address } }, { new: true }).select("-password -refreshToken -role");
        return res.status(200).json({
            success: response ? true : false,
            updateUser: response ? response : "Something went wrong",
        });
    });

    // PUT : update cart
    updateUserCart = asyncHandler(async (req, res) => {
        const { _id } = req.payload;
        const { pid, quantity } = req.body;
        if (!pid || !quantity) throw new Error("Missing input");
        const userCart = await User.findById(_id).select("cart");
        const productInCart = await userCart.cart.find((item) => item.product.toString() === pid);
        if (productInCart) {
            const response = await User.updateOne({ cart: { $elemMatch: productInCart } }, { $set: { "cart.$.quantity": quantity } }, { new: true })
            return res.status(200).json({
                success: response ? true : false,
                updateUser: response ? response : "Something went wrong",
            });
        } else {
            const response = await User.findByIdAndUpdate(_id, { $push: { cart: { product: pid, quantity } } }, { new: true }).select("-password -refreshToken -role");
            return res.status(200).json({
                success: response ? true : false,
                updateUser: response ? response : "Something went wrong",
            });
        }
    });
}

module.exports = new UserController();
