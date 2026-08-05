import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";


// Pages
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import RoomDetails from "./pages/RoomDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";

import MyBookings from "./pages/MyBookings";
import Favourites from "./pages/Favourites";

import Profile from "./pages/Profile";
import Settings from "./pages/Settings";


// ==========================
// ADMIN PAGES IMPORT
// ==========================

import ManageBookings from "./pages/ManageBookings";
import ManageUsers from "./pages/ManageUsers";
import Reports from "./pages/Reports";
import AdminSettings from "./pages/AdminSettings";

import AddRoom from "./pages/AddRoom";
import EditRoom from "./pages/EditRoom";
import DeleteRoom from "./pages/DeleteRoom";



// ==========================
// USER PROTECTED ROUTE
// ==========================

function Protected({children}){

const {user,loading}=useAuth();


if(loading){

return(
<div className="app-loader">
Loading VidyaVerse...
</div>
)

}


if(!user){

return <Navigate to="/login" replace />

}


const role=user?.role || user?.user?.role;



if(role==="admin"){

return <Navigate to="/admin/dashboard" replace />

}



return children;

}




// ==========================
// ADMIN PROTECTED ROUTE
// ==========================


function AdminProtected({children}){


const {user,loading}=useAuth();


if(loading){

return(

<div className="app-loader">

Loading VidyaVerse...

</div>

)

}



if(!user){

return <Navigate to="/login" replace />

}



const role=user?.role || user?.user?.role;



if(role!=="admin"){

return <Navigate to="/dashboard" replace />

}



return children;


}




// ==========================
// APP
// ==========================


export default function App(){


return(

<Routes>


{/* PUBLIC */}


<Route path="/" element={<Home/>}/>


<Route path="/rooms" element={<Rooms/>}/>


<Route 
path="/rooms/:id"
element={<RoomDetails/>}
/>


<Route path="/about" element={<About/>}/>


<Route path="/contact" element={<Contact/>}/>


<Route path="/login" element={<Login/>}/>


<Route path="/register" element={<Register/>}/>


<Route 
path="/forgot-password"
element={<ForgotPassword/>}
/>





{/* STUDENT */}


<Route

path="/dashboard"

element={

<Protected>

<Dashboard/>

</Protected>

}

/>



<Route

path="/bookings"

element={

<Protected>

<MyBookings/>

</Protected>

}

/>



<Route

path="/favourites"

element={

<Protected>

<Favourites/>

</Protected>

}

/>



<Route

path="/profile"

element={

<Protected>

<Profile/>

</Protected>

}

/>



<Route

path="/settings"

element={

<Protected>

<Settings/>

</Protected>

}

/>







{/* ==========================
        ADMIN
========================== */}



<Route

path="/admin/dashboard"

element={

<AdminProtected>

<AdminDashboard/>

</AdminProtected>

}

/>




<Route

path="/admin/add-room"

element={

<AdminProtected>

<AddRoom/>

</AdminProtected>

}

/>



<Route

path="/admin/edit-room"

element={

<AdminProtected>

<EditRoom/>

</AdminProtected>

}

/>



<Route

path="/admin/delete-room"

element={

<AdminProtected>

<DeleteRoom/>

</AdminProtected>

}

/>



<Route

path="/admin/bookings"

element={

<AdminProtected>

<ManageBookings/>

</AdminProtected>

}

/>



<Route

path="/admin/users"

element={

<AdminProtected>

<ManageUsers/>

</AdminProtected>

}

/>



<Route

path="/admin/reports"

element={

<AdminProtected>

<Reports/>

</AdminProtected>

}

/>



<Route

path="/admin/settings"

element={

<AdminProtected>

<AdminSettings/>

</AdminProtected>

}

/>





{/* FALLBACK */}


<Route

path="*"

element={<Navigate to="/" replace/>}

/>


</Routes>

)

}