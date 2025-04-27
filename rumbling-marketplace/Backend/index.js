const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bidderAuthRoutes = require("./routes/bidderRoutes");
const sellerAuthRoutes = require("./routes/sellerRoutes");
const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("🟢 MongoDB Connected"))
  .catch((err) => console.error("🔴 MongoDB Error:", err));

app.get("/", (req, res) => {
  res.send("Welcome to The Rumbling Marketplace Backend");
});

app.use("/auth/bidder", bidderAuthRoutes);
app.use("/auth/seller", sellerAuthRoutes);
app.use("/api/products", productRoutes); // Product routes here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));