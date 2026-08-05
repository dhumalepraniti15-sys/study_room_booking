import {
  Building2,
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Users,
  BarChart3,
  Settings,
  Plus,
  Edit,
  Trash2
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

import Brand from "./Brand";

import { useAuth } from "../context/AuthContext";

import { useState } from "react";


const links = [

  [LayoutDashboard,"Dashboard","/admin-dashboard"],

  [CalendarDays,"Manage Bookings","/admin/bookings"],

  [Users,"Manage Users","/admin/users"],

  [BarChart3,"Reports","/admin/reports"],

  [Settings,"Settings","/admin/settings"]
  

];


export default function AdminDashboardLayout({
title,
subtitle,
children
}){


const {user,logout}=useAuth();

const navigate=useNavigate();


const [roomOpen,setRoomOpen]=useState(false);



const leave=()=>{

logout();

navigate("/");

};



return (

<div className="dashboard-shell">


<aside className="sidebar">


<Brand/>




{/* Dashboard */}

{
links.map(([Icon,label,path])=>(

<NavLink

key={path}

to={path}

>

<Icon/>

{label}


</NavLink>

))

}





{/* Manage Rooms */}


<button

onClick={()=>setRoomOpen(!roomOpen)}

>

<Building2/>

Manage Rooms

</button>



{

roomOpen &&

<div className="submenu">


<NavLink to="/admin/add-room">

<Plus/>

Add Room

</NavLink>



<NavLink to="/admin/edit-room">

<Edit/>

Edit Room

</NavLink>




<NavLink to="/admin/delete-room">

<Trash2/>

Delete Room

</NavLink>



</div>

}





<button onClick={leave}>

<LogOut/>

Logout

</button>



</aside>






<main className="dashboard-main">


<div className="dash-top">


<div>

<p className="eyebrow">
VIDYAVERSE ADMIN PORTAL
</p>


<h1>
{title}
</h1>


<p>
{subtitle}
</p>


</div>




<NavLink 

to="/admin/profile"

className="user-chip"

>


<span>
{user?.name?.[0]}
</span>


{user?.name}


</NavLink>



</div>




{children}



</main>



</div>

)


}