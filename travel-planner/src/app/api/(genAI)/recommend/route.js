import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import showdown from "showdown";

export async function POST(request) {
  try {
    const { location } = await request.json();
    const apiKey = process.env.GEMINI_API;

    if (!location || !apiKey) {
      return NextResponse.json(
        { error: "Location or API Key missing!" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });
    const prompt = `Provide travel recommendations for ${location}. Consider factors like popular attractions, local cuisine, and budget-friendly activities.`;

    const result = await model.generateContent(prompt);
    const converter = new showdown.Converter();
    const recommendations = converter.makeHtml(result.response.text());

    return NextResponse.json({ recommendations }, { status: 200 });
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return NextResponse.json(
      { error: "Failed to generate recommendations." },
      { status: 500 }
    );
  }
}
