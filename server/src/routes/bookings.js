import express from "express";
import { z } from "zod";
import mongoose from "mongoose";

import Booking from "../models/Booking.js";
import Room from "../models/Room.js";

import { protect, admin } from "../middleware/auth.js";


const router = express.Router();



const schema = z.object({

  room: z.string(),

  date: z.coerce.date(),

  startTime: z.string()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/),

  endTime: z.string()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/)

});





// =================================
// STUDENT GET OWN BOOKINGS
// =================================

router.get("/", protect, async(req,res,next)=>{

try{


const bookings = await Booking.find({

user:req.user._id

})

.populate("room")

.sort({
date:-1
});


res.json({
bookings
});


}

catch(error){

next(error);

}


});







// =================================
// ADMIN GET ALL BOOKINGS
// =================================

router.get(
"/admin/all",
protect,
admin,
async(req,res,next)=>{


try{


const bookings = await Booking.find()

.populate(
"user",
"name email"
)

.populate(
"room",
"name location price"
)

.sort({
createdAt:-1
});


res.json({
bookings
});


}

catch(error){

next(error);

}


});








// =================================
// CREATE BOOKING
// =================================

router.post("/",protect,async(req,res,next)=>{


try{


const input=schema.parse(req.body);



if(
!mongoose.Types.ObjectId.isValid(input.room)
){

return res.status(400).json({

message:"Invalid room id"

});

}



if(input.endTime <= input.startTime){

return res.status(400).json({

message:"End time must be after start time"

});

}




const room = await Room.findOne({

_id:input.room,

isAvailable:true

});



if(!room){

return res.status(404).json({

message:"Room unavailable"

});

}





const overlap = await Booking.exists({

room:room._id,

date:input.date,

status:"confirmed",

startTime:{
$lt:input.endTime
},

endTime:{
$gt:input.startTime
}

});



if(overlap){

return res.status(409).json({

message:"This time slot already booked"

});

}





const hours =

(

new Date(
`1970-01-01T${input.endTime}`
)

-

new Date(
`1970-01-01T${input.startTime}`
)

)
/36e5;




const booking = await Booking.create({

...input,

user:req.user._id,

totalAmount:
hours * room.price

});




res.status(201).json({

booking:
await booking.populate("room")

});



}

catch(error){

next(error);

}


});









// =================================
// STUDENT CANCEL BOOKING
// =================================


router.patch(
"/:id/cancel",
protect,
async(req,res,next)=>{


try{


const booking =
await Booking.findOneAndUpdate(

{

_id:req.params.id,

user:req.user._id,

status:"confirmed"

},

{

status:"cancelled"

},

{

new:true

}

)
.populate("room");




if(!booking){

return res.status(404).json({

message:"Active booking not found"

});

}



res.json({

booking

});



}

catch(error){

next(error);

}


});









// =================================
// ADMIN UPDATE BOOKING STATUS
// =================================


router.patch(

"/admin/:id/status",

protect,

admin,

async(req,res,next)=>{


try{


const {status}=req.body;



const booking =
await Booking.findByIdAndUpdate(

req.params.id,

{

status

},

{

new:true

}

)

.populate("user","name email")

.populate("room","name location");




if(!booking){

return res.status(404).json({

message:"Booking not found"

});

}



res.json({

booking

});



}

catch(error){

next(error);

}


});









// =================================
// ADMIN DELETE BOOKING
// =================================


router.delete(

"/admin/:id",

protect,

admin,

async(req,res,next)=>{


try{


const booking =
await Booking.findByIdAndDelete(
req.params.id
);



if(!booking){

return res.status(404).json({

message:"Booking not found"

});

}



res.json({

message:"Booking deleted successfully"

});


}

catch(error){

next(error);

}


});





export default router;