import express from "express";
import { z } from "zod";
import Room from "../models/Room.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

const schema = z.object({
  name: z.string().min(2),
  location: z.string().min(2),
  capacity: z.coerce.number().int().positive(),
  price: z.coerce.number().nonnegative(),
  image: z.string().url().optional().or(z.literal("")),
  amenities: z.array(z.string()).default([]),
  isAvailable: z.boolean().optional(),
});

// ======================
// GET ALL ROOMS
// ======================
router.get("/", async (req, res, next) => {
  try {
    const { search, capacity, location } = req.query;

    const q = { isAvailable: true };

    if (search) {
      q.name = { $regex: search, $options: "i" };
    }

    if (capacity) {
      q.capacity = { $gte: Number(capacity) };
    }

    if (location) {
      q.location = { $regex: location, $options: "i" };
    }

    const rooms = await Room.find(q).sort({ createdAt: -1 });

    res.json({ rooms });
  } catch (err) {
    next(err);
  }
});

// ======================
// GET SINGLE ROOM
// ======================
router.get("/:id", async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    res.json({ room });
  } catch (err) {
    next(err);
  }
});

// ======================
// CREATE ROOM
// ======================
router.post("/", protect, admin, async (req, res, next) => {
  try {
    const room = await Room.create(schema.parse(req.body));

    res.status(201).json({ room });
  } catch (err) {
    next(err);
  }
});

// ======================
// UPDATE ROOM
// ======================
router.patch("/:id", protect, admin, async (req, res, next) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      schema.partial().parse(req.body),
      {
        new: true,
        runValidators: true,
      }
    );

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    res.json({ room });
  } catch (err) {
    next(err);
  }
});

// ======================
// DELETE ROOM
// ======================
router.delete("/:id", protect, admin, async (req, res, next) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default router;