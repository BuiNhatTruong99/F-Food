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
      default:
        "https://res.cloudinary.com/dgepjghio/image/upload/v1688019896/FAST_FOOD/rajonpcozuxnshdpcqib.jpg",
    },
    images: {
      type: Array,
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
        updatedAt: {
          type: Date,
        },
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
