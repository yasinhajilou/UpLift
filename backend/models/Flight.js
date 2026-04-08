const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema(
  {
    flightId: { type: String, required: true, unique: true },
    airline: { type: String, required: true },
    from: { type: String, required: true }, // IATA code like YYZ
    to: { type: String, required: true },   // IATA code like LAX
    departureDate: { type: String, required: true }, // YYYY-MM-DD
    departureTime: { type: String, required: true }, // HH:MM
    arrivalDate: { type: String, required: true },   // YYYY-MM-DD
    arrivalTime: { type: String, required: true },   // HH:MM
    duration: { type: String, required: true },      // e.g., "5h 30m"
    price: { type: Number, required: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Flight", flightSchema);
