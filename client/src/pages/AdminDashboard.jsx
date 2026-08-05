import React, { useEffect, useState } from "react";
import {
  Building2,
  Users,
  CalendarCheck,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";

import AdminDashboardLayout from "../components/AdminDashboardLayout";
import { api } from "../services/api";

import "./AdminDashboard.css";


export default function AdminDashboard() {


  const [rooms,setRooms] = useState([]);
  const [users,setUsers] = useState([]);
  const [bookings,setBookings] = useState([]);

  const [loading,setLoading] = useState(true);



  useEffect(()=>{

    loadDashboard();

  },[]);



  const loadDashboard = async()=>{

    try{


      const [
        roomsResponse,
        usersResponse,
        bookingsResponse

      ] = await Promise.all([

        api.get("/rooms"),

        api.get("/users"),

        api.get("/bookings")

      ]);



      setRooms(
        roomsResponse.data.rooms || []
      );


      setUsers(
        usersResponse.data.users || []
      );


      setBookings(
        bookingsResponse.data.bookings || []
      );


    }
    catch(error){

      console.log(
        "Dashboard Error:",
        error
      );

    }
    finally{

      setLoading(false);

    }


  };





  const availableRooms =
    rooms.filter(
      room =>
      room.status === "available"
    ).length;



  const occupiedRooms =
    rooms.filter(
      room =>
      room.status === "booked"
    ).length;



  if(loading){

    return(

      <AdminDashboardLayout
      title="Admin Dashboard"
      subtitle="Loading dashboard data..."
      >

        <div className="loading">
          Loading...
        </div>

      </AdminDashboardLayout>

    );

  }





return(

<AdminDashboardLayout

title="Admin Dashboard"

subtitle="Manage your Study Room Booking System"

>


<div className="dashboard-wrapper">



{/* SUMMARY CARDS */}


<div className="dashboard-cards">


<DashboardCard

icon={<Building2/>}

title="Total Rooms"

value={rooms.length}

/>



<DashboardCard

icon={<Users/>}

title="Total Users"

value={users.length}

/>




<DashboardCard

icon={<CalendarCheck/>}

title="Total Bookings"

value={bookings.length}

/>



<DashboardCard

icon={<CheckCircle/>}

title="Available Rooms"

value={availableRooms}

/>



</div>









{/* ROOM STATUS */}


<div className="admin-box">


<h2>
Room Status
</h2>



<div className="status-grid">


<div>

<CheckCircle/>

<h3>
Available
</h3>


<p>
{availableRooms}
</p>


</div>



<div>

<XCircle/>

<h3>
Booked
</h3>


<p>
{occupiedRooms}
</p>


</div>



</div>


</div>









{/* BOOKINGS */}



<div className="admin-box">


<h2>
Recent Bookings
</h2>



<table>


<thead>

<tr>

<th>
User
</th>


<th>
Room
</th>


<th>
Date
</th>


<th>
Status
</th>


</tr>


</thead>



<tbody>


{

bookings.length > 0 ?


bookings
.slice(0,5)
.map((booking)=>(


<tr key={booking._id}>


<td>

{
booking.user?.name ||
"N/A"
}

</td>



<td>

{
booking.room?.name ||
"N/A"
}

</td>




<td>

{
booking.date ?

new Date(
booking.date
).toLocaleDateString()

:

"N/A"

}

</td>




<td>


<span className={

booking.status === "approved"

?

"approved"

:

"pending"

}>


{
booking.status ||
"Pending"
}


</span>



</td>



</tr>


))


:


<tr>

<td colSpan="4">

No bookings found

</td>


</tr>


}



</tbody>



</table>


</div>







</div>


</AdminDashboardLayout>


);


}









function DashboardCard({
icon,
title,
value
}){


return(

<div className="dashboard-card">


<div className="card-icon">

{icon}

</div>



<div>

<h3>
{title}
</h3>


<h1>
{value}
</h1>


</div>



</div>

);


}