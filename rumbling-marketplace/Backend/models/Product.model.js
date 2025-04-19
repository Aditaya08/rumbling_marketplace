const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    bidder: {type : mongoose.Schema.Types.ObjectId, ref: "Bidder", required : true},

    amount : {type: Number, required: true},

    timestamp: {type: Date, default: Date.now},
});

const productSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: { type: String, required: true },
  image: { type: String, required: true }, // URL or file path
  currentBid: { type: Number, default: 0 }, // Starts at base price
  bidTimer: { type: Date, required: true }, // Auction end time (set by seller)
  previousBids: [bidSchema], // Array of previous bids
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
  category: { type: String, required: true },
},{ timestamps: true});

module.exports = mongoose.model("Product", productSchema);