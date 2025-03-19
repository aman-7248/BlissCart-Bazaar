import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModels.js"

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
