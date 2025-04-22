
import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email: {
        type: String,  //  Use 'String' for email
        required: true, // Make it required (optional)
        unique: true,   //  Ensure email is unique
        lowercase: true, //  Convert to lowercase
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], //  Validate format
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Ensures a minimum password length
        // select: false ---> Excludes password from queries by default
    },
    phone:{
        type:Number,
        required:true
    },
    address:{
        type:{},
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:0
    }
},{timestamps:true}); //timestamp ---> jab bhi new user create hoga uska created time bhi add hoga

export default mongoose.model('users',userSchema);