const mongoose = require("mongoose"); // Erase if already required
const bycrypt = require("bcrypt");

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
        cart: {
            type: Array,
            default: [],
        },
        address: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
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

//Export the model
module.exports = mongoose.model("User", userSchema);
