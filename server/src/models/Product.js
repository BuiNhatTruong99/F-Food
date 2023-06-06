const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var producSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        image: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            default: 0,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
    },
    { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", producSchema);
