const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const showdown = require("showdown");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./models/user.js");
const Trip = require("./models/trip.js");

const app = express();
const port = process.env.PORT || 3000;

//middlewares
app.use(cors());
app.use(bodyParser.json());
// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Token required" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
    req.user = user; // Attach the decoded user info to the request
    next();
  });
};


// MongoDB connection
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

// Routes

app.get("/", (req, res) => {
  res.send("Welcome to the Travel Recommendations API");
});

app.get("/trips", authenticateToken, async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user.id });
    res.status(200).json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


app.post("/register", async (req, res) => {
  const { email, password, name, age, gender } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      age,
      gender,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // Corrected here
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


app.post("/trip", authenticateToken, async (req, res) => {
  const { destination, days, travelDate, returnDate, budget } = req.body;

  try {
    const prompt = `Provide a day-by-day travel plan for ${days} days in ${destination} with a budget of ${budget}. Include attractions, activities, estimated budget for every activity, and local food recommendations.`;
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });
    const result = await model.generateContent({ prompt });
    const recommendations = result.data.candidates[0].output;

    const newTrip = new Trip({
      userId: req.user.id,
      destination,
      days,
      travelDate,
      returnDate,
      recommendations,
      budget,
    });

    await newTrip.save();
    res.status(201).json({ message: "Trip created successfully", trip: newTrip });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/getRecommendations", async (req, res) => {
  const { location } = req.body; 
  const apiKey = process.env.GEMINI_API; 

  if (!location || !apiKey) {
    return res.status(400).json({ error: "Location or API Key missing!" });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });
  const prompt = `Provide travel recommendations for ${location}. Consider factors like popular attractions, local cuisine, and budget-friendly activities.`;

  try {
    const result = await model.generateContent(prompt);
    const converter = new showdown.Converter();
    const recommendations = converter.makeHtml(result.response.text());
    res.json({ recommendations });
  } catch (error) {
    console.error("Error generating recommendations:", error);
    res.status(500).json({ error: "Failed to generate recommendations." });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
