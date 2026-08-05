import mongoose from 'mongoose';
const roomSchema=new mongoose.Schema({name:{type:String,required:true,trim:true},location:{type:String,required:true},capacity:{type:Number,required:true,min:1},price:{type:Number,required:true,min:0},image:{type:String,default:''},amenities:[String],isAvailable:{type:Boolean,default:true}},{timestamps:true}); export default mongoose.model('Room',roomSchema);
