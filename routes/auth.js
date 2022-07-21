const User = require("../models/User");
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const user = new User({
    first: req.body.first,
    last: req.body.last,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
  });
  try {
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const decryptPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const originalPassword = decryptPassword.toString(CryptoJS.enc.Utf8);
    originalPassword !== req.body.password && res.status(401).json("Wrong Password");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...other } = user._doc;
    res.status(200).json({ ...other, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
