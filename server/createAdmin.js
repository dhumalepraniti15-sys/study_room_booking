import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import User from "./src/models/User.js";

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);

try {
  const adminExists = await User.findOne({
    email: "admin@vidyaverse.com",
  });

  if (adminExists) {
    console.log("✅ Admin already exists.");
    process.exit();
  }

  const hashedPassword = await bcrypt.hash("Admin@123", 12);


  const admin = await User.create({
    name: "System Admin",
    email: "admin@vidyaverse.com",
    password: hashedPassword,
    role: "admin",
  });

  console.log("✅ Admin created successfully!");
  console.log(admin);

} catch (err) {
  console.error(err);
} finally {
  await mongoose.connection.close();
}