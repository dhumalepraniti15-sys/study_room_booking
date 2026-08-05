import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

import User from "../models/User.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();


// ===============================
// Validation
// ===============================

const registerSchema = z.object({
  name: z.string().min(2).max(60),
  email: z.string().email(),
  password: z.string().min(8),
});


// ===============================
// JWT
// ===============================

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};


// ===============================
// Response
// ===============================

const userResponse = (user) => ({
  token: generateToken(user),

  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
});


// ===============================
// REGISTER
// ===============================

router.post("/register", async (req, res, next) => {
  try {
    const input = registerSchema.parse(req.body);

    const existingUser = await User.findOne({
      email: input.email,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(
      input.password,
      12
    );

    const user = await User.create({
  name: input.name,
  email: input.email,
  password: hashedPassword,

  role: "student",
});

    res.status(201).json(userResponse(user));
  } catch (error) {
    console.error(error);
    next(error);
  }
});


// ===============================
// LOGIN
// ===============================

router.post("/login", async (req, res, next) => {
  try {
    const input = z
      .object({
        email: z.string().email(),
        password: z.string().min(1),
      })
      .parse(req.body);

    console.log("LOGIN REQUEST:", input.email);

    const user = await User.findOne({
      email: input.email,
    });

    if (!user) {
      return res.status(401).json({
        message: "Incorrect email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(
      input.password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Incorrect email or password",
      });
    }

    console.log("LOGIN USER ROLE:", user.role);

    res.status(200).json(userResponse(user));
  } catch (error) {
    console.error(error);
    next(error);
  }
});


// ===============================
// CURRENT USER
// ===============================

router.get("/me", protect, (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

export default router;