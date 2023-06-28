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
      type: String,
      required: true,
    },
    thumb: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
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
    ratings: [
      {
        star: { type: Number },
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: { type: String },
      },
    ],
    totalRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", producSchema);
