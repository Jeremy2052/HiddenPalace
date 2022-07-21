const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number },
      img: { type: String },
      title: { type: String },
      desc: { type: String },
      price: { type: Number },
    },
  ],
});

module.exports = mongoose.model("Order", OrderSchema);
