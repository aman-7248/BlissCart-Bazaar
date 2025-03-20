import express from "express";
import { registerController,loginController,testController } from '../controllers/authController.js'
import { requireSignin ,isAdmin} from "../middlewares/authMiddleware.js";

//agar seperate file me routing karoge toh router object create karna padta hai
const router=express.Router();

//actaul syntax  router.post('Url',callback function)   but hum mvc use kar rahe isliye controller alag likhe hai
router.post('/register',registerController);
// Jab POST request aaye /register route pe, toh registerController function run hoga

router.post('/login', loginController);

router.get('/test', requireSignin,isAdmin,testController);
export default router;
