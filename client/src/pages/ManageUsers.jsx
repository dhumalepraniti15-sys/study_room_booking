import React, {useEffect, useState} from "react";
import axios from "axios";
import "./ManageUsers.css";


const ManageUsers =()=>{


const [users,setUsers]=useState([]);

const [loading,setLoading]=useState(true);





const getUsers=async()=>{

try{


const res=await axios.get(
"http://localhost:5000/api/auth/users",
{
headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`
}
}
);


setUsers(res.data.users || []);



}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}


};





useEffect(()=>{

getUsers();

},[]);








const deleteUser=async(id)=>{


if(!window.confirm("Delete this user?"))
return;



try{


await axios.delete(

`http://localhost:5000/api/auth/users/${id}`,

{

headers:{
Authorization:
`Bearer ${localStorage.getItem("token")}`
}

}

);


getUsers();


}
catch(error){

console.log(error);

}


};






if(loading)
return <div className="admin-loading">
Loading Users...
</div>






return(


<div className="manage-users">


<div className="users-header">


<div>

<h1>
Manage Users
</h1>

<p>
View and manage all registered users
</p>

</div>



<div className="user-count">

Total:
<span>
{users.length}
</span>

</div>



</div>






<div className="users-card">



{
users.length===0?


<div className="empty-users">


<h3>
No Users Found
</h3>

<p>
No registered users available.
</p>


</div>



:


<table>


<thead>

<tr>

<th>
User
</th>


<th>
Email
</th>


<th>
Role
</th>


<th>
Joined
</th>


<th>
Action
</th>


</tr>


</thead>





<tbody>


{
users.map((user)=>(


<tr key={user._id}>


<td>


<div className="user-profile">


<div className="avatar">

{
user.name
?.charAt(0)
.toUpperCase()

}

</div>


<div>

<h4>
{user.name}
</h4>

</div>


</div>


</td>





<td>
{user.email}
</td>






<td>

<span 
className={`role ${user.role}`}
>

{user.role}

</span>


</td>







<td>

{
new Date(user.createdAt)
.toLocaleDateString()
}


</td>







<td>


{
user.role !== "admin" &&

<button

className="delete-btn"

onClick={()=>deleteUser(user._id)}

>

Delete

</button>

}



</td>






</tr>



))


}



</tbody>


</table>


}





</div>





</div>


)


}



export default ManageUsers;