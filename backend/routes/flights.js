const express = require("express");
const Flight = require("../models/Flight");
const router = express.Router();

// GET all flights with optional filters
router.get("/", async (req, res) => {
  try {
    const { from, to, date } = req.query;

    // Build filter object
    let filter = { isActive: true };

    if (from) {
      filter.from = from.toUpperCase();
    }

    if (to) {
      filter.to = to.toUpperCase();
    }

    if (date) {
      filter.departureDate = date;
    }

    const flights = await Flight.find(filter).sort({ departureTime: 1 });

    res.json({
      message: "Flights retrieved successfully",
      count: flights.length,
      flights: flights,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving flights",
      error: err.message,
    });
  }
});

// GET a specific flight by ID
router.get("/:flightId", async (req, res) => {
  try {
    const flight = await Flight.findOne({
      flightId: req.params.flightId,
      isActive: true,
    });

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    res.json({
      message: "Flight retrieved successfully",
      flight: flight,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving flight",
      error: err.message,
    });
  }
});

module.exports = router;
