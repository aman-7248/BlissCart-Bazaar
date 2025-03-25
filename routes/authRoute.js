import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} from "../controllers/authController.js";
import { requireSignin, isAdmin } from "../middlewares/authMiddleware.js";

//agar seperate file me routing karoge toh router object create karna padta hai
const router = express.Router();

//actaul syntax  router.post('Url',callback function)   but hum mvc use kar rahe isliye controller alag likhe hai
router.post("/register", registerController);
// Jab POST request aaye /register route pe, toh registerController function run hoga

router.post("/login", loginController);

router.post("/forgot-password",forgotPasswordController)

router.get("/test", requireSignin, isAdmin, testController); //authentication  authorisation

// protected route auth like dashboard
//Protects routes like Dashboard, Profile, and Settings
//Ensures only logged-in users can access certain pages
router.get("/user-auth", requireSignin, (req, res) => {  // Call /user-auth from the frontend to check if the user is authenticated, checks if a user is authenticated using requireSignin, If valid, it responds with { ok: true }.
  res.status(200).send({ ok: true });
});

 
//protected Admin route
                        //checks token //check role
router.get("/admin-auth", requireSignin,isAdmin,(req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
