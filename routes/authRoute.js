import express from "express";
import { registerController } from '../controllers/authController.js'

//agar seperate file me routing karoge toh router object create karna padta hai
const router=express.Router();

//actaul syntax  router.post('Url',callback function)   but hum mvc use kar rahe isliye controller alag likhe hai
router.post('/register',registerController);


export default router;
