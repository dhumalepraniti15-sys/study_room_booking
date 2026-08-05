import React, { useState } from "react";
import { api } from "../services/api";
import "./AddRoom.css";


export default function AddRooms() {


  const [room, setRoom] = useState({

    name: "",
    location: "",
    capacity: "",
    price: "",
    image: "",
    amenities: "",
    isAvailable: true

  });


  const [loading, setLoading] = useState(false);



  const handleChange = (e) => {

    const { name, value } = e.target;

    setRoom({

      ...room,

      [name]: value

    });

  };





  const addRoom = async (e) => {

    e.preventDefault();


    try {

      setLoading(true);


      const data = {

        name: room.name,

        location: room.location,

        capacity: Number(room.capacity),

        price: Number(room.price),

        image: room.image,

        amenities: room.amenities
          .split(",")
          .map(item => item.trim()),

        isAvailable: room.isAvailable

      };



      await api.post("/rooms", data);



      alert("Room Added Successfully");



      setRoom({

        name: "",
        location: "",
        capacity: "",
        price: "",
        image: "",
        amenities: "",
        isAvailable: true

      });


    }

    catch(error) {


      console.log(error);


      alert(
        error.response?.data?.message ||
        "Room Add Failed"
      );


    }

    finally {

      setLoading(false);

    }

  };






  return (

    <div className="add-room-page">


      <div className="add-room-card">


        <h1>
          Add New Room
        </h1>



        <form onSubmit={addRoom}>


          <input

            type="text"

            name="name"

            placeholder="Room Name"

            value={room.name}

            onChange={handleChange}

            required

          />



          <input

            type="text"

            name="location"

            placeholder="Location"

            value={room.location}

            onChange={handleChange}

            required

          />



          <input

            type="number"

            name="capacity"

            placeholder="Capacity"

            value={room.capacity}

            onChange={handleChange}

            required

          />



          <input

            type="number"

            name="price"

            placeholder="Price"

            value={room.price}

            onChange={handleChange}

            required

          />



          <input

            type="text"

            name="image"

            placeholder="Image URL"

            value={room.image}

            onChange={handleChange}

          />



          <input

            type="text"

            name="amenities"

            placeholder="Amenities (WiFi, AC, Projector)"

            value={room.amenities}

            onChange={handleChange}

          />



          <select

            name="isAvailable"

            value={room.isAvailable}

            onChange={(e)=>

              setRoom({

                ...room,

                isAvailable:
                e.target.value === "true"

              })

            }

          >


            <option value="true">
              Available
            </option>


            <option value="false">
              Not Available
            </option>


          </select>




          <button type="submit">

            {
              loading
              ?
              "Adding..."
              :
              "Add Room"
            }

          </button>



        </form>


      </div>


    </div>

  );

}