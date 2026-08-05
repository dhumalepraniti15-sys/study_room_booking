import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import "./DeleteRoom.css";


export default function DeleteRoom() {


  const [rooms,setRooms] = useState([]);

  const [loading,setLoading] = useState(false);



  // Get All Rooms

  const fetchRooms = async()=>{

    try{

      const res = await api.get("/rooms");

      setRooms(res.data.rooms);

    }

    catch(error){

      console.log(error);

    }

  };




  useEffect(()=>{

    fetchRooms();

  },[]);






  // Delete Room

  const deleteRoom = async(id)=>{


    const confirmDelete = window.confirm(
      "Are you sure you want to delete this room?"
    );


    if(!confirmDelete) return;



    try{


      setLoading(true);



      await api.delete(
        `/rooms/${id}`
      );



      alert(
        "Room deleted successfully"
      );


      fetchRooms();



    }

    catch(error){


      console.log(error);


      alert(
        error.response?.data?.message ||
        "Delete failed"
      );


    }

    finally{

      setLoading(false);

    }


  };






  return (

    <div className="delete-room-page">


      <div className="delete-room-box">


        <h1>
          Manage Rooms
        </h1>



        {

        rooms.length === 0

        ?

        <p className="no-room">
          No Rooms Available
        </p>


        :


        rooms.map((room)=>(


          <div 
          className="delete-room-card"
          key={room._id}
          >


            <div>


              <h3>
                {room.name}
              </h3>


              <p>
                Location: {room.location}
              </p>


              <p>
                Capacity: {room.capacity}
              </p>


              <p>
                Price: ₹{room.price}
              </p>


              <p>

                Status:

                {
                  room.isAvailable
                  ?
                  " Available"
                  :
                  " Not Available"
                }

              </p>


            </div>



            <button

            onClick={()=>
              deleteRoom(room._id)
            }

            disabled={loading}

            >

            {
              loading
              ?
              "Deleting..."
              :
              "Delete"
            }


            </button>



          </div>


        ))

        }



      </div>


    </div>

  );

}