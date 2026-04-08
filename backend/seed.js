require('dotenv').config();
const mongoose = require('mongoose');
const Flight = require('./models/Flight');

const mockFlights = [
  {
    flightId: "f1",
    airline: "Air Canada",
    from: "YYZ",
    to: "LAX",
    departureDate: "2026-04-15",
    departureTime: "08:00",
    arrivalDate: "2026-04-15",
    arrivalTime: "11:30",
    duration: "5h 30m",
    price: 299,
    isActive: true
  },
  {
    flightId: "f2",
    airline: "WestJet",
    from: "YYZ",
    to: "NYC",
    departureDate: "2026-04-15",
    departureTime: "10:00",
    arrivalDate: "2026-04-15",
    arrivalTime: "12:00",
    duration: "2h",
    price: 199,
    isActive: true
  },
  {
    flightId: "f3",
    airline: "Air Canada",
    from: "YYZ",
    to: "NYC",
    departureDate: "2026-04-15",
    departureTime: "14:30",
    arrivalDate: "2026-04-15",
    arrivalTime: "16:30",
    duration: "2h",
    price: 189,
    isActive: true
  },
  {
    flightId: "f4",
    airline: "WestJet",
    from: "YYZ",
    to: "LAX",
    departureDate: "2026-04-16",
    departureTime: "06:00",
    arrivalDate: "2026-04-16",
    arrivalTime: "09:30",
    duration: "5h 30m",
    price: 279,
    isActive: true
  },
  {
    flightId: "f5",
    airline: "United Airlines",
    from: "LAX",
    to: "NYC",
    departureDate: "2026-04-15",
    departureTime: "13:00",
    arrivalDate: "2026-04-15",
    arrivalTime: "21:00",
    duration: "5h",
    price: 249,
    isActive: true
  },
  {
    flightId: "f6",
    airline: "Delta",
    from: "NYC",
    to: "LAX",
    departureDate: "2026-04-16",
    departureTime: "09:00",
    arrivalDate: "2026-04-16",
    arrivalTime: "12:00",
    duration: "5h",
    price: 259,
    isActive: true
  }
];

async function seedFlights() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    // Clear existing flights
    await Flight.deleteMany({});
    console.log('Cleared existing flights');

    // Insert mock flights
    const result = await Flight.insertMany(mockFlights);
    console.log(`${result.length} flights seeded successfully`);

    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding flights:', err);
    process.exit(1);
  }
}

seedFlights();
