import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js"


import JWT from "jsonwebtoken";
//controllers functions me jo bhi function help kar rahe hai woh helper folder me likhe hai
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address ,answer} = req.body;
    //validations
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone number is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }
    if(!answer){
      return res.send({ message: "Answer is required" });
    }

    //checking for existing user agar exist karta hai to login karenge na ki register
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered with this Email kindly Login",
      });
    }

    //finally we hash password and register user
    const hashedPassword = await hashPassword(password);
    //save the user
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      answer,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error); //for server side printing
    res.status(500).send({
      //for client side
      success: false,
      message: "Error in Registratiion",
      error,
    });
  }
};

//callback function hai :::it will always have req and res
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // checking user exists or not
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        //agar return nahi karoge toh further code execute hota rahega
        success: false,
        message: "Email not registered",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //jab password and email sab match ho jaye

    // token creation
    //jwt syntax -->  jwt.sign(kis basis pe ,secret key ,days after whick token expire)
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        //ye isliye bheja hai kyuki frontend me user ki details show karni hai
        _id:user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role:user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//controller for forgot password
export const forgotPasswordController=async (req,res)=>{
  try{
    const {email,answer,newPassword}=req.body;
    if(!email){
      res.status(400).send({message:"Email is required"});
    }
    if(!answer){
      res.status(400).send({message:"question answer is required"});
    }
    if(!newPassword){
      res.status(400).send({message:"Password is required"});
    }

    //check ki email and question answer is correct then only update password
    const user=await userModel.findOne({email,answer});
    if(!user){
      return res.status(404).send({
        success:false,
        message:"Wrong Data Entered"
      })
    }
    // if user is found then we have to update password

    const hashed=await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id,{password:hashed});
    res.status(200).send({
      success:true,
      message:"Password Reset Successfull",
     
    })


  }
  catch(error){
    console.log(error);
    res.status(500).send({
      success:false,
      message:"Something went wrong",
      error
    })
  }
};





export const testController = (req, res) => {
 try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

// update profile

export const updateProfileController = async (req, res) => {
  console.log("PUT route hit");

  try {
    const { name, email, password, address, phone } = req.body;

    const user = await userModel.findById(req.user._id);

    // Password validation
    if (password && password.length < 6) {
      return res.json({ error: "Password must be at least 6 characters long" });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true } // returns the updated document
    );

    res.status(200).send({
      success: true,
      message: 'Profile Updated Successfully',
      updatedUser
    });

  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: 'Error while updating the profile',
      error
    });
  }
};





//orders for user
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({buyer:req.user._id})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt:-1 });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Geting Orders",
      error,
    });
  }
};

//for admin
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt:-1 });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Geting Orders",
      error,
    });
  }
};

//order status by admin
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updating Order",
      error,
    });
  }
};




import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { GiMailShirt } from "react-icons/gi";

let tempUserData = {}; // Temporary store for OTP verification
dotenv.config();
// Step 1: Send OTP
export const sendOtpController = async (req, res) => {
  try {
    const { email, name, password, phone, address, answer } = req.body;
    if (!email) return res.send({ success: false, message: "Email is required" });

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered with this Email, kindly Login",
      });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Store user data temporarily
    tempUserData[email] = { name, password, phone, address, answer, otp };

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD, // Use Gmail App Password
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP for Email Verification",
      text: `Your OTP for email verification is ${otp}. It is valid for 5 minutes.`,
    });

    res.send({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error sending OTP", error });
  }
};

// Step 2: Verify OTP & Register User
export const verifyOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.send({ success: false, message: "Email and OTP required" });

    if (tempUserData[email] && tempUserData[email].otp == otp) {
      const { name, password, phone, address, answer } = tempUserData[email];
      const hashedPassword = await hashPassword(password);

      const user = await new userModel({
        name,
        email,
        phone,
        address,
        answer,
        password: hashedPassword,
      }).save();

      delete tempUserData[email]; // Clear temp data

      res.status(201).send({
        success: true,
        message: "Email verified and user registered successfully",
        user,
      });
    } else {
      res.send({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error verifying OTP", error });
  }
};
