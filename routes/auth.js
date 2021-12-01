const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");

// Register route

router.post("/register", async (req, res) => {
  // validating user input
  const { error } = registerValidation(req.body);
  if (error) return res.status(401).send(error.message);

  //   checking if user already made an account
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) return res.status(401).send("user already exists");

  // Salting and hasing passsword
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //   creating new user object
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  // saving user object
  try {
    const savedUser = await newUser.save();
    res.status(200).send(savedUser);
  } catch (err) {
    res.status(401).json(err);
  }
});

// Login Route

router.post("/login", async (req, res) => {
  // validating form data
  const { error } = loginValidation(req.body);
  if (error) return res.status(401).json(error.message);

  try {
    // finding if user is already signed up
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send("user not registerd yet. sign up");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(401).send("wrong password");

    // creating json webtoken
    const token = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      process.env.TOKEN_PASS,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    res.setHeader("token", token).json({ ...others, token });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
