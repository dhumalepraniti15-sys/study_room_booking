import React, { useEffect, useState } from "react";
import PublicLayout from "../components/PublicLayout";
import RoomCard from "../components/RoomCard";
import { api } from "../services/api";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);

      const res = await api.get("/rooms");

      console.log("Rooms API:", res.data);

      setRooms(res.data.rooms || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Unable to load rooms."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <main className="rooms-page">
        <h1>Study Rooms</h1>

        {loading && (
          <h3 style={{ textAlign: "center" }}>Loading rooms...</h3>
        )}

        {error && (
          <h3 style={{ textAlign: "center", color: "red" }}>
            {error}
          </h3>
        )}

        {!loading && rooms.length === 0 && (
          <h3 style={{ textAlign: "center" }}>
            No rooms available.
          </h3>
        )}

        <div className="rooms-grid">
          {rooms.map((room) => (
            <RoomCard
              key={room._id}
              room={room}
            />
          ))}
        </div>
      </main>
    </PublicLayout>
  );
}