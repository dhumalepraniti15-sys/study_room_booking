import React from "react";
import { Link } from "react-router-dom";
import Brand from "./Brand";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <Brand dark />
        <p>Smart study spaces designed for focused learning.</p>
        <p>Book your perfect room and study without distractions.</p>
      </div>

      <div className="footer-section">
        <h3>Quick Links</h3>
        <Link to="/">Home</Link>
        <Link to="/rooms">Browse Rooms</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="footer-section">
        <h3>Services</h3>
        <Link to="/booking">Room Booking</Link>
        <Link to="/my-bookings">My Bookings</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/support">Support</Link>
      </div>

      <div className="footer-section">
        <h3>Contact Us</h3>
        <p>Email:<br />support@vidyaverse.edu</p>
        <p>Phone:<br />+91 98765 43210</p>
        <p>Working Hours:<br />Mon - Sat, 9 AM - 6 PM</p>
      </div>

      <div className="footer-bottom">
        <p>© 2026 VidyaVerse. All Rights Reserved.</p>
      </div>
    </footer>
  );
}