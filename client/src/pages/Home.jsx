import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarCheck,
  Clock3,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import PublicLayout from "../components/PublicLayout";
import RoomCard from "../components/RoomCard";
import { api } from "../services/api";

export default function Home() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await api.get("/rooms");
      setRooms(res.data.rooms || []);
    } catch (err) {
      console.error("Failed to load rooms:", err);
    }
  };

  return (
    <PublicLayout>
      <main>
        <section className="hero">
          <div>
            <p className="eyebrow">SPACE TO FOCUS. ROOM TO GROW.</p>

            <h1>
              Your best study session starts <em>here.</em>
            </h1>

            <p className="lead">
              Discover quiet spaces, coordinate group discussions,
              and reserve your ideal room in minutes.
            </p>

            <div className="hero-actions">
              <Link className="button button-primary" to="/rooms">
                Explore Rooms <ArrowRight size={18} />
              </Link>

              <a className="button button-ghost" href="#how-it-works">
                How it works
              </a>
            </div>

            <div className="trust-row">
              <span>
                <CalendarCheck size={18} />
                Instant booking
              </span>

              <span>
                <ShieldCheck size={18} />
                Secure & Reliable
              </span>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=85"
              alt="Modern Study Room"
            />

            <div className="float-card">
              <Sparkles size={18} />
              <b>Designed for Focus</b>
              <small>Premium spaces on campus</small>
            </div>
          </div>
        </section>

        <section className="stats">
          <div>
            <b>50+</b>
            <span>Study Rooms</span>
          </div>

          <div>
            <b>3500+</b>
            <span>Bookings</span>
          </div>

          <div>
            <b>1200+</b>
            <span>Happy Students</span>
          </div>

          <div>
            <b>4.8/5</b>
            <span>Rating</span>
          </div>
        </section>

        <section id="how-it-works" className="section">
          <p className="eyebrow">HOW IT WORKS</p>

          <h2>Book your study room in 3 easy steps.</h2>

          <div className="steps">
            <article>
              <span>01</span>
              <SearchIcon />
              <h3>Discover Room</h3>
              <p>Find the perfect room for your study session.</p>
            </article>

            <article>
              <span>02</span>
              <CalendarCheck />
              <h3>Select Time</h3>
              <p>Choose your preferred date and time slot.</p>
            </article>

            <article>
              <span>03</span>
              <Clock3 />
              <h3>Start Learning</h3>
              <p>Get instant confirmation and enjoy your study session.</p>
            </article>
          </div>
        </section>

        <section className="section featured">
          <div className="section-head">
            <div>
              <p className="eyebrow">POPULAR ROOMS</p>
              <h2>Featured Study Spaces</h2>
            </div>

            <Link to="/rooms">
              View All <ArrowRight size={18} />
            </Link>
          </div>

          <div className="room-grid">
            {rooms.slice(0, 3).map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        </section>

        <section className="section why">
          <p className="eyebrow">WHY VIDYAVERSE</p>

          <h2>More than a room. A better way to learn.</h2>

          <div>
            <article>
              <Users />
              <h3>Built for Students</h3>
              <p>
                Flexible spaces for individual study and collaboration.
              </p>
            </article>

            <article>
              <Sparkles />
              <h3>Premium Experience</h3>
              <p>
                Modern rooms equipped with everything you need.
              </p>
            </article>

            <article>
              <ShieldCheck />
              <h3>Secure Booking</h3>
              <p>
                Fast booking with easy cancellation options.
              </p>
            </article>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16l4 4" />
    </svg>
  );
}