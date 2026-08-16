import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  _id: false,
  stars: {
    type: Number,
    required: true,
    default: 0,
  },
  count: {
    type: Number,
    required: true,
    default: 0,
  },
});

const productSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
      default: "/images/default.jpg",
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: ratingSchema,
      required: true,
      default: {},
    },
    price: {
      type: Number,
      required: true,
    },
    keywords: {
      type: [],
      required: true,
      default: [],
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
