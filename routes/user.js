const router = require("express").Router();
const User = require("../models/User");
const {
  verifyToken,
  verifyTokenAndAthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

// UPDATING
router.put("/:id", verifyTokenAndAthorization, async (req, res) => {
  if (req.body.password) {
    // Salting and hasing passsword
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  // Updating user
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// DELETE

router.delete("/:id", verifyTokenAndAthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status.json("user has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET

router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET ALL USERS

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();

    res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET USER STATS

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
