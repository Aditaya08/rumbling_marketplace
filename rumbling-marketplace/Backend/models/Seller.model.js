const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  listings: [
    {
      item: String,
      startingPrice: Number,
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Seller", SellerSchema);