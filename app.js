require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected to db"))
  .catch((err) => {
    console.log(err);
  });

// Imported Routes
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

// Middlewares
app.use(express.json());

// Routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
