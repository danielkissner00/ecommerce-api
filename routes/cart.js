const router = require("express").Router();
const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

// CREATE

router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newProduct.save();
    return res.status(200).json(savedCart);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// UPDATING

router.put("/:id", verifyTokenAndAthorization, async (req, res) => {
  // Updating user
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// DELETE

router.delete("/:id", verifyTokenAndAthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status.json("Product has been removed from cart");
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET

router.get("/find/:userId", verifyTokenAndAthorization, async (req, res) => {
  try {
    const cart = await Product.findOne(req.params.userId);

    res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    return res.status(200).json(carts);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
