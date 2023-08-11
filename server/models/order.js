const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    prodtucId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Product",
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    email: {
      type: String,
      required: true,
    },
    cardName: {
      type: String,
      required: true,
    },
    cardDetails: {
      type: Number,
      required: true,
    },
    billingAddress: {
      type: String,
      required: true,
    },
    shipping: {
      type: String,
      required: true,
    },
    status: {
        type: String,
        default: 'Pending'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema, "orders");
