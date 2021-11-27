const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    products: [
      {
        productId: {
          type: String,
          required: true,
        },
        qauntity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    address: { type: Object, required: true },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
