const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const showdown = require("showdown");

const app = express();
const port = process.env.PORT || 3000;


app.use(cors()); 
app.use(bodyParser.json()); 

app.get("/",(req,res)=>{
    res.send("Welcome to the Travel Recommendations API");
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
