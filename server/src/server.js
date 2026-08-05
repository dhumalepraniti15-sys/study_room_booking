import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import auth from "./routes/auth.js";
import rooms from "./routes/rooms.js";
import bookings from "./routes/bookings.js";
import ratingRoutes from "./routes/ratings.js";

const app = express();

// ======================
// Debug Logs
// ======================
console.log("Current Working Directory:", process.cwd());
console.log("Mongo URI Loaded:", process.env.MONGODB_URI ? "YES" : "NO");
console.log("Client Origin:", process.env.CLIENT_ORIGIN);

// ======================
// Middleware
// ======================
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN?.split(",") || "*",
    credentials: true,
  })
);

app.use(express.json());

// ======================
// Health Check
// ======================
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Study Room Booking API Running",
  });
});

// ======================
// Routes
// ======================
app.use("/api/auth", auth);
app.use("/api/rooms", rooms);
app.use("/api/bookings", bookings);
app.use("/api/ratings", ratingRoutes);

// ======================
// MongoDB Connection
// ======================
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      family: 4,
    });

    console.log("✅ MongoDB Connected Successfully");

    mongoose.connection.on("connected", () => {
      console.log("🟢 MongoDB connection established");
    });

    mongoose.connection.on("error", (err) => {
      console.error("🔴 MongoDB Runtime Error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("🟡 MongoDB Disconnected");
    });

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB Initial Connection Error");
    console.error(err);
    process.exit(1);
  }
}

startServer();