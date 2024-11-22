
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Trip from "@/models/trip";
import { verifyAuth } from "@/lib/auth";

export async function GET(request) {
  try {
    await connectDB();
    const user = await verifyAuth(request);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const trips = await Trip.find({ userId: user.id });
    return NextResponse.json(trips, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const user = await verifyAuth(request);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { destination, days, travelDate, returnDate, budget } =
      await request.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });
    const prompt = `Provide a day-by-day travel plan for ${days} days in ${destination} with a budget of ${budget}. Include attractions, activities, estimated budget for every activity, and local food recommendations.`;

    const result = await model.generateContent({ prompt });
    const recommendations = result.data.candidates[0].output;

    const newTrip = new Trip({
      userId: user.id,
      destination,
      days,
      travelDate,
      returnDate,
      recommendations,
      budget,
    });

    await newTrip.save();
    return NextResponse.json(
      { message: "Trip created successfully", trip: newTrip },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
