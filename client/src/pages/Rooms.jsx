import React, { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import PublicLayout from "../components/PublicLayout";
import RoomCard from "../components/RoomCard";
import { api } from "../services/api";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [capacity, setCapacity] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);

      const res = await api.get("/rooms");

      console.log("Rooms:", res.data.rooms);

      setRooms(res.data.rooms || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load rooms.");
    } finally {
      setLoading(false);
    }
  };

  const shown = useMemo(() => {
    return rooms.filter(
      (room) =>
        room.name.toLowerCase().includes(query.toLowerCase()) &&
        (!capacity || room.capacity >= Number(capacity))
    );
  }, [rooms, query, capacity]);

  return (
    <PublicLayout>
      <main className="catalog">
        <p className="eyebrow">EXPLORE VIDYAVERSE</p>

        <h1>Find a space that fits the way you work.</h1>

        <p>
          Browse study rooms, quiet pods, and collaborative spaces
          available on campus.
        </p>

        <div className="filters">
          <Search />

          <input
            type="text"
            placeholder="Search by room name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          >
            <option value="">Any Capacity</option>
            <option value="2">2+ Seats</option>
            <option value="4">4+ Seats</option>
            <option value="6">6+ Seats</option>
          </select>

          <span>
            <SlidersHorizontal /> {shown.length} Rooms
          </span>
        </div>

        {loading ? (
          <h2 style={{ textAlign: "center" }}>
            Loading Rooms...
          </h2>
        ) : error ? (
          <h2 style={{ textAlign: "center", color: "red" }}>
            {error}
          </h2>
        ) : shown.length === 0 ? (
          <h2 style={{ textAlign: "center" }}>
            No Rooms Found
          </h2>
        ) : (
          <div className="room-grid">
            {shown.map((room) => (
              <RoomCard
                key={room._id}
                room={room}
              />
            ))}
          </div>
        )}
      </main>
    </PublicLayout>
  );
}