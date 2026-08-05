import React, { useEffect, useState } from "react";

import {
  Heart,
  Plus,
  Search,
  Building2,
  CheckCircle,
  CalendarDays
} from "lucide-react";

import { Link } from "react-router-dom";

import DashboardLayout from "../components/DashboardLayout";

import { api } from "../services/api";

import { useAuth } from "../context/AuthContext";

import { useFavourites } from "../context/FavouritesContext";



export default function Dashboard(){


  const { user } = useAuth();

  const { ids } = useFavourites();


  const [bookings,setBookings] = useState([]);

  const [rooms,setRooms] = useState([]);





  useEffect(()=>{

    fetchDashboardData();

  },[]);





  const fetchDashboardData = async()=>{

    try{


      const bookingRes = await api.get("/bookings");


      setBookings(
        bookingRes.data.bookings || []
      );



      const roomRes = await api.get("/rooms");


      setRooms(
        roomRes.data.rooms || []
      );



    }

    catch(err){

      console.log(err);

    }

  };






  const activeBookings = bookings.filter(

    booking => booking.status === "confirmed"

  );





  const totalRooms = rooms.length;





  const availableRooms = Math.max(

    totalRooms - activeBookings.length,

    0

  );






return(


<DashboardLayout


title="🏠 User Dashboard"


subtitle={`Welcome ${user?.name || "Student"} 👋 Manage your study spaces easily.`}



>





{/* Dashboard Cards */}


<section className="metrics">



<Metric

icon={<Building2/>}

n={totalRooms}

t="Available Rooms"

/>





<Metric

icon={<CheckCircle/>}

n={availableRooms}

t="Free Rooms"

/>





<Metric

icon={<CalendarDays/>}

n={activeBookings.length}

t="My Bookings"

/>





<Metric

icon={<Heart/>}

n={ids.length}

t="Favourite Rooms"

/>




</section>









<section className="dash-grid">







{/* Recommended Rooms */}



<div className="dash-card">


<div className="card-title">


<div>


<h2>
📚 Recommended Study Rooms
</h2>


<p>
Choose your perfect study space
</p>


</div>


</div>







{

rooms.length > 0 ?



rooms.slice(0,4).map(room=>(


<div

className="booking-row"

key={room._id}

>



<img

src={room.image}

alt="Room"

/>





<div>


<b>

{room.name}

</b>



<span>

Capacity : {room.capacity || 4} Students

</span>



<span>

Available : Yes

</span>


</div>





<Link

to={`/rooms/${room._id}`}

className="button button-primary"

>

Book Now

</Link>



</div>



))



:



<div className="empty-small">

<p>
No rooms available.
</p>


<Link to="/rooms">

Browse Rooms

</Link>


</div>



}



</div>













{/* Quick Actions */}



<div className="quick-card">



<p className="eyebrow">

QUICK ACTIONS

</p>




<h2>

Ready for your next study session?

</h2>





<Link

to="/rooms"

className="button button-primary"

>


<Search/>

Browse Rooms


</Link>






<Link

to="/bookings"

className="button button-ghost"

>


<Plus/>

My Bookings


</Link>






<Link

to="/favourites"

className="button button-ghost"

>


<Heart/>

Favourite Rooms


</Link>





</div>





</section>









{/* Recent Activity */}



<section className="dash-card activity">


<h2>

📜 Recent Activity

</h2>




<p>

Welcome to VidyaVerse 🎓


<br/>


You have

<strong>
{" "}
{activeBookings.length}
</strong>

booking(s),


<strong>
{" "}
{ids.length}
</strong>

favourite rooms,


and


<strong>
{" "}
{availableRooms}
</strong>

rooms available.



</p>



</section>







</DashboardLayout>


);



}









function Metric({icon,n,t}){


return(


<article className="metric-card">


<span className="metric-icon">

{icon}

</span>



<b>

{n}

</b>




<small>

{t}

</small>



</article>


);


}