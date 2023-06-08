const mongoose = require("mongoose"); // Erase if already required
const bycrypt = require("bcrypt");
const crypto = require("crypto");

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        mobile: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "user",
        },
        cart: [{
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number, default: 1 },
        }],
        address: {
            type: String,
        },
        wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
        isBlocked: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
        },
        passwordResetToken: {
            type: String,
        },
        passwordChangeAt: {
            type: String,
        },
        passwordResetExpires: {
            type: String,
        },
    },
    { timestamps: true }
);

// hash password before saving  :  1234 => $2b$05$rz6aM5P1ndlrQfBCRn8.O.gBhgA92T9Maur7u6DC.L9pwuPmwS0Ty
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bycrypt.genSalt(5);
    this.password = await bycrypt.hash(this.password, salt);
});

// check password
userSchema.methods = {
    comparePassword: async function (password) {
        return await bycrypt.compare(password, this.password);
    },
    createPasswordChangeToken: function () {
        // create token
        const resetToken = crypto.randomBytes(32).toString("hex");
        // hash token
        this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        // set token expire time
        this.passwordResetExpires = Date.now() + 15 * 60 * 1000;
        // return token
        return resetToken;
    }
}
//Export the model
module.exports = mongoose.model("User", userSchema);
