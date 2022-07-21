const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const stripeRoute = require("./routes/stripe");
const cartRoute = require("./routes/cart");
const cors = require("cors");
const path = require("path");

dotenv.config();
app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log(err);
  });

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("api/checkout", stripeRoute);
app.use("/api/cart", cartRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/shoe-shop/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/shoe-shop/build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
