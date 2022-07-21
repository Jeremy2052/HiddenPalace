const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const Cart = require("../models/Cart");
const router = require("express").Router();

//create cart
router.post("/", async (req, res) => {
  const cart = new Cart(req.body);

  try {
    const savedCart = await cart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// grab users cart
router.get("/:id", async (req, res) => {
  try {
    const cart = Cart.findById(req.params.id);
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update cart
router.put("/:id", async (req, res) => {
  try {
    const cart = Cart.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).send(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete cart
router.delete("/:id", async (req, res) => {
  try {
    const cart = Cart.products.findByIdAndRemove(req.params.id);
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
