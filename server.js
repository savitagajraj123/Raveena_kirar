

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const User = require("./models/user");

const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

// Registration
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {

    const hash = await bcrypt.hash(password, 10);

    const newUser = new User({  name , email , password: hash });
    await newUser.save();

    res.json({ message: "Registration successful" });
  } catch (err) {
    res.json({ message: "Error" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      res.json({ message: "Login successful" });
    } else {
      res.json({ message: "Wrong password" });
    }

  } catch (err) {
    res.json({ message: "Error" });
  }
});

// score save
app.post("/save-score", async (req, res) => {
  const { email, score } = req.body;

  try {
    await User.updateOne(
      { email: email },
      { $set: { score: score } }
    );

    res.json({ message: "Score saved" });
  } catch (err) {
    res.json({ message: "Error saving score" });
  }
});

app.get("/leaderboard", async (req, res) => {
  try {
    const users = await User.find()
      .sort({ score: -1 }) // highest score first
      .limit(5); // top 5

    res.json(users);
  } catch (err) {
    res.json({ message: "Error fetching leaderboard" });
  }
});
const PORT = process.env.PORT || 3000;
app.listen( PORT , () => {
  console.log("Server running on port 3000");
});

