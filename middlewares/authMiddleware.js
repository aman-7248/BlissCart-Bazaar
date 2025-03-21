import JWT from "jsonwebtoken"
import userModel from "../models/userModel.js";

// routes token based                  
export const requireSignin = async (req,res,next) => {   //middleware me 3 parameter hote hai (req,res,next)
    try{
        //basically login ke time pe jo token bheja tha woh (req.header.autorisation me save hau hai)
        //JWT verification syntax   --->>  jwt.verify(token,secret key) 
        const decode = JWT.verify(req.headers.authorization,process.env.JWT_SECRET);
        req.user=decode;
        next();
    }catch(error){
        console.log(error); 
    }
}


// is admin  (checking for authorised user or not ---- Authorization )
export const isAdmin= async(req,res,next)=>{
    try{
        const user= await userModel.findById(req.user._id);
        if(user.role !==1){
            return res.status(401).send({
                success:false,
                message:"Unauthorized access"
            })
        }else{
            next();
        }
    }catch(error){
        console.log(error);
        res.status(401).send({
            success:false,
            error,
            message:"Error in Admin middleware"
        })
    }
}