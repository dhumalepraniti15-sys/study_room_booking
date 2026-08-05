import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import RoomCard from "../components/RoomCard";
import { useFavourites } from "../context/FavouritesContext";
import { api } from "../services/api";

export default function Favourites() {
  const { ids } = useFavourites();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await api.get("/rooms");

      const favouriteRooms = res.data.rooms.filter((room) =>
        ids.includes(room._id)
      );

      setRooms(favouriteRooms);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [ids]);

  return (
    <DashboardLayout
      title="My Favourites"
      subtitle="Keep your go-to study spaces close by."
    >
      {rooms.length > 0 ? (
        <div className="room-grid">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      ) : (
        <div className="dash-card empty-small">
          <Heart />
          <h3>No saved spaces yet</h3>
          <p>Tap the heart on any room to save it for later.</p>
        </div>
      )}
    </DashboardLayout>
  );
}