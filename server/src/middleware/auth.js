import jwt from "jsonwebtoken";
import User from "../models/User.js";


// Protect User Route

export const protect = async (req, res, next) => {

  try {


    const token = req.headers.authorization?.split(" ")[1];


    if(!token){

      return res.status(401).json({
        message:"Authentication required"
      });

    }



    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );



    const user = await User
      .findById(decoded.id)
      .select("-password");



    if(!user){

      return res.status(401).json({
        message:"User not found"
      });

    }



    req.user = user;


    next();



  }

  catch(error){


    console.log("AUTH ERROR:",error.message);


    return res.status(401).json({
      message:"Invalid or expired token"
    });


  }

};







// Admin Only Route

export const admin = (req,res,next)=>{


  console.log(
    "ADMIN CHECK USER:",
    req.user
  );



  if(req.user?.role === "admin"){

    next();

  }

  else{


    return res.status(403).json({

      message:"Admin access required"

    });


  }


};