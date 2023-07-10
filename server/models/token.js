const mongoose = require("mongoose");

const RefreshTokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true },
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "RefreshTokenSchema",
  RefreshTokenSchema,
  "tokens"
);
