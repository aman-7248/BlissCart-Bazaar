import { hashPassword ,comparePassword} from "../helpers/authHelper.js";
import userModel from "../models/userModel.js"
import JWT from "jsonwebtoken";
export const registerController=async (req,res)=>{
    try{
        const {name,email,password,phone,address}=req.body
        //validations
        if(!name){
            return res.send({error:'Name is required'})
        }
        if(!email){
            return res.send({error:'Email is required'})
        }
        if(!password){
            return res.send({error:'Password is required'})
        }
        if(!phone){
            return res.send({error:'Phone number is required'})
        }
        if(!address){
            return res.send({error:'Address is required'})
        }

        //checking for existing user agar exist karta hai to login karenge na ki register
        const existingUser=await userModel.findOne({email:email});
        if(existingUser){
            return res.status(200).send({
                success:true,
                message:'Already Registered with this Email kindly Login',
            })
        }

        //finally we hash password and register user
        const hashedPassword=await hashPassword(password);
        //save the user
        const user=await new userModel({name,email,phone,address,password:hashedPassword}).save();
        res.status(201).send({
            success:true,
            message:'User Registered Successfully',
            user,
        })


    }catch(error){
        console.log(error);  //for server side printing
        res.status(500).send({     //for client side
            success:false,
            message:'Error in Registratiion',
            error
        })
    }
};


export const loginController = async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email  || !password){
            return res.status(404).send({
                success:false,
                massage:"Invalid email or password"
            });
        }

        // checking existing user or not
        const user= await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                massage:"Email not registered"
            });
        }

        const match= await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                massage:"Invalid Password"
            });
        }

        // token creation
        const token= await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        return res.status(200).send({
            success:true,
            massage:"login successfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
            },
            token
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            massage:"Error in login",
            error
        })
    }
};

export const testController=(req,res)=>{
    res.send("Protected routes");
}
