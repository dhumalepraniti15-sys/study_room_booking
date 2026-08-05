import { Heart, MapPin, Users, Wifi } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";

export default function RoomCard({ room }) {
  const { ids, toggle } = useFavourites();

  if (!room) return null;

  console.log("Room Object:", room);
  console.log("Room ID:", room._id);
  console.log("Room Link:", `/rooms/${room._id}`);

  const liked = ids.includes(room._id);

  return (
    <article className="room-card">
      <div className="room-image">
        <img
          src={room.image}
          alt={room.name}
          loading="lazy"
        />

        <button
          type="button"
          onClick={() => toggle(room._id)}
          aria-label="Toggle Favourite"
          className={liked ? "liked" : ""}
        >
          <Heart fill={liked ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="room-info">
        <p className="room-location">
          <MapPin size={16} />
          {room.location}
        </p>

        <h3>{room.name}</h3>

        <div className="room-meta">
          <span>
            <Users size={16} />
            {room.capacity} Seats
          </span>

          <span>
            <Wifi size={16} />
            Wi-Fi
          </span>
        </div>

        <div className="room-bottom">
          <b>
            ₹{room.price}
            <small>/hour</small>
          </b>

          <Link
            to={`/rooms/${room._id}`}
            className="button button-small"
          >
            View Room
          </Link>
        </div>
      </div>
    </article>
  );
}