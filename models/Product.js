const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    img: { type: String, required: true },
    description: { type: String, required: true },
    categories: { type: Array, required: true },
    price: { type: Number, required: true },
    size: { type: Array, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
