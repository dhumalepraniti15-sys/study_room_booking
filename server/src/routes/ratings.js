import express from "express";
import Rating from "../models/Rating.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// =====================================
// Add Rating
// POST /api/ratings
// =====================================
router.post("/", protect, async (req, res) => {
  try {
    const { room, booking, rating, review } = req.body;

    // Check if user already rated this booking
    const existing = await Rating.findOne({
      user: req.user._id,
      booking,
    });

    if (existing) {
      return res.status(400).json({
        message: "You have already rated this booking.",
      });
    }

    const newRating = await Rating.create({
      user: req.user._id,
      room,
      booking,
      rating,
      review,
    });

    res.status(201).json({
      message: "Rating submitted successfully.",
      rating: newRating,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// =====================================
// Get Average Rating of Room
// GET /api/ratings/:roomId
// =====================================
router.get("/:roomId", async (req, res) => {
  try {
    const ratings = await Rating.find({
      room: req.params.roomId,
    });

    if (ratings.length === 0) {
      return res.json({
        average: 0,
        totalReviews: 0,
      });
    }

    const total = ratings.reduce(
      (sum, item) => sum + item.rating,
      0
    );

    const average = total / ratings.length;

    res.json({
      average: average.toFixed(1),
      totalReviews: ratings.length,
      ratings,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;