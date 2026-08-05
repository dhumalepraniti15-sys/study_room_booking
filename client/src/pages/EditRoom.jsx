import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import "./EditRoom.css";


export default function EditRoom() {


  const { id } = useParams();

  const navigate = useNavigate();


  const [room,setRoom] = useState({

    name:"",
    location:"",
    capacity:"",
    price:"",
    image:"",
    amenities:"",
    isAvailable:true

  });



  const [loading,setLoading] = useState(false);




  // Get Single Room

  const getRoom = async()=>{

    try{


      const res = await api.get(`/rooms/${id}`);


      const data = res.data.room;


      setRoom({

        name:data.name,

        location:data.location,

        capacity:data.capacity,

        price:data.price,

        image:data.image,

        amenities:data.amenities.join(", "),

        isAvailable:data.isAvailable

      });


    }

    catch(error){

      console.log(error);

    }


  };





  useEffect(()=>{

    getRoom();

  },[]);







  const handleChange=(e)=>{


    const {name,value}=e.target;


    setRoom({

      ...room,

      [name]:value

    });


  };







  // Update Room

  const updateRoom = async(e)=>{


    e.preventDefault();


    try{


      setLoading(true);



      await api.patch(`/rooms/${id}`,{


        name:room.name,

        location:room.location,

        capacity:Number(room.capacity),

        price:Number(room.price),

        image:room.image,


        amenities:
        room.amenities
        .split(",")
        .map(item=>item.trim()),


        isAvailable:room.isAvailable


      });



      alert("Room Updated Successfully");


      navigate("/admin/rooms");



    }

    catch(error){


      console.log(error);


      alert(
        error.response?.data?.message ||
        "Update Failed"
      );


    }

    finally{

      setLoading(false);

    }


  };







return (


<div className="edit-room-page">


<div className="edit-room-card">


<h1>
Edit Room
</h1>




<form onSubmit={updateRoom}>


<input

type="text"

name="name"

value={room.name}

onChange={handleChange}

placeholder="Room Name"

/>




<input

type="text"

name="location"

value={room.location}

onChange={handleChange}

placeholder="Location"

/>





<input

type="number"

name="capacity"

value={room.capacity}

onChange={handleChange}

placeholder="Capacity"

/>





<input

type="number"

name="price"

value={room.price}

onChange={handleChange}

placeholder="Price"

/>





<input

type="text"

name="image"

value={room.image}

onChange={handleChange}

placeholder="Image URL"

/>





<input

type="text"

name="amenities"

value={room.amenities}

onChange={handleChange}

placeholder="Amenities"

/>






<select

name="isAvailable"

value={room.isAvailable}

onChange={(e)=>

setRoom({

...room,

isAvailable:
e.target.value==="true"

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
"Updating..."
:
"Update Room"
}


</button>




</form>



</div>


</div>


);


}