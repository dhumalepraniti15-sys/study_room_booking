import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  MapPin,
  Users,
  Wifi,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PublicLayout from "../components/PublicLayout";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

export default function RoomDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("10:00");
  const [message, setMessage] = useState("");

  const slots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00",
  ];

  useEffect(() => {
    fetchRoom();
  }, []);

  const fetchRoom = async () => {
  console.log("Room ID:", id);

  try {
    const res = await api.get(`/rooms/${id}`);

    console.log("Response:", res.data);

    setRoom(res.data.room);
   } catch (err) {
    console.log("Status:", err.response?.status);
    console.log("Error:", err.response?.data);
   }
   };

  const book = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!date) {
      setMessage("Please choose a booking date.");
      return;
    }

    try {
      const end = `${String(Number(slot.slice(0, 2)) + 1).padStart(
        2,
        "0"
      )}:00`;

      console.log("Booking Room ID:", room._id);

      await api.post("/bookings", {
        room: room._id,
        date,
        startTime: slot,
        endTime: end,
      });

      setMessage("✅ Your room is confirmed.");
    } catch (e) {
      setMessage(
        e.response?.data?.message || "Unable to confirm booking."
      );
    }
  };

  if (!room) {
    return (
      <PublicLayout>
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>
          Loading Room...
        </h2>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <main className="detail">
        <Link className="back" to="/rooms">
          <ArrowLeft /> Back to rooms
        </Link>

        <div className="detail-grid">
          <img src={room.image} alt={room.name} />

          <section>
            <p className="eyebrow">AVAILABLE NOW</p>

            <h1>{room.name}</h1>

            <p className="room-location">
              <MapPin />
              {room.location}
            </p>

            <div className="detail-meta">
              <span>
                <Users />
                {room.capacity} seats
              </span>

              <span>
                <Wifi />
                High-speed Wi-Fi
              </span>

              <span>
                <Check />
                Study-ready
              </span>
            </div>

            <p className="lead">
              A comfortable, well-equipped space designed to help you focus,
              collaborate, and make the most of your session.
            </p>

            <div className="amenities">
              {(room.amenities || ["Wi-Fi", "Whiteboard"]).map((a) => (
                <span key={a}>{a}</span>
              ))}
            </div>
          </section>
        </div>

        <section className="booking-panel">
          <div>
            <p className="eyebrow">BOOK THIS SPACE</p>

            <h2>Choose a date and time.</h2>

            <label>
              <CalendarDays />
              Date

              <input
                type="date"
                min={new Date().toISOString().slice(0, 10)}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
          </div>

          <div>
            <p className="time-label">Available time slots</p>

            <div className="slots">
              {slots.map((s) => (
                <button
                  key={s}
                  className={slot === s ? "selected" : ""}
                  onClick={() => setSlot(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="confirm-row">
              <b>
                ₹{room.price}
                <small> / 1 hour</small>
              </b>

              <button
                className="button button-primary"
                onClick={book}
              >
                Confirm Booking
              </button>
            </div>

            {message && (
              <p className="booking-message">{message}</p>
            )}
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}