import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  days: {
    type: Number,
    required: true,
  },
  travelDate: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
  },
  recommendations: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Trip = mongoose.models.trips || mongoose.model("Trip", tripSchema);

export default Trip;
