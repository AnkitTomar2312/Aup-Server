const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Config = require("./config/config");



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

// Create a User model based on the schema
const User = mongoose.model('User', userSchema);

// Middleware to parse JSON request bodies
app.use(express.json());

// Register endpoint
app.post('/register', async (req, res) => {
  try {
    // Create a new user instance
    const newUser = new User(req.body);
    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



mongoose.set("strictQuery", false);
mongoose
  .connect(Config.mongoURI)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(Config.PORT, () => {
  console.log(`Server is running on port ${Config.PORT}`);
});
