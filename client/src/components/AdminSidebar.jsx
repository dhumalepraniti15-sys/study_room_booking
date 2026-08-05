<div className="menu-container">


{/* Dashboard */}

<NavLink
to="/admin-dashboard"
className={activeMenu}
>

<LayoutDashboard size={20}/>

<span>Dashboard</span>

</NavLink>





{/* Manage Bookings */}

<NavLink
to="/admin/bookings"
className={activeMenu}
>

<CalendarDays size={20}/>

<span>Manage Bookings</span>

</NavLink>





{/* Manage Users */}

<NavLink
to="/admin/users"
className={activeMenu}
>

<Users size={20}/>

<span>Manage Users</span>

</NavLink>





{/* Manage Rooms */}

<div className="room-section">

<button
className="menu-item"
onClick={()=>setRoomMenu(!roomMenu)}
>

<Building2 size={20}/>

<span>Manage Rooms</span>

<ChevronDown
size={18}
className={roomMenu ? "rotate" : ""}
/>

</button>



{
roomMenu &&

<div className="sub-menu">


<NavLink
to="/admin/add-room"
className={activeMenu}
>

<Plus size={18}/>

<span>Add Room</span>

</NavLink>




<NavLink
to="/admin/edit-room"
className={activeMenu}
>

<Edit size={18}/>

<span>Edit Room</span>

</NavLink>




<NavLink
to="/admin/delete-room"
className={activeMenu}
>

<Trash2 size={18}/>

<span>Delete Room</span>

</NavLink>


</div>

}

</div>





{/* Reports */}

<NavLink
to="/admin/reports"
className={activeMenu}
>

<BarChart3 size={20}/>

<span>Reports</span>

</NavLink>





{/* Settings */}

<NavLink
to="/admin/settings"
className={activeMenu}
>

<Settings size={20}/>

<span>Settings</span>

</NavLink>



</div>