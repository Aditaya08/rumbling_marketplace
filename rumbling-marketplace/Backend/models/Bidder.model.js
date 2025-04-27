const  mongoose  = require("mongoose");

const BidderSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    biddingHistory: [
      {
        item: String,
        price: Number,
        date: { type: Date, default: Date.now },
      },
    ],
  });
  
  module.exports = mongoose.model("Bidder", BidderSchema);
