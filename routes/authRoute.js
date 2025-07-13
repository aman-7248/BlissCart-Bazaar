import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import { updateProfileController } from "../controllers/authController.js";

//agar seperate file me routing karoge toh router object create karna padta hai
const router = express.Router();

//actaul syntax  router.post('Url',callback function)   but hum mvc use kar rahe isliye controller alag likhe hai
router.post("/register", registerController);
// Jab POST request aaye /register route pe, toh registerController function run hoga

router.post("/login", loginController);

router.post("/forgot-password", forgotPasswordController);

router.get("/test", requireSignIn, isAdmin, testController); //authentication  authorisation

// protected route auth like dashboard
//Protects routes like Dashboard, Profile, and Settings
//Ensures only logged-in users can access certain pages
router.get("/user-auth", requireSignIn, (req, res) => {
  // Call /user-auth from the frontend to check if the user is authenticated, checks if a user is authenticated using requireSignin, If valid, it responds with { ok: true }.
  res.status(200).send({ ok: true });
});

//protected Admin route
//checks token //check role
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders",requireSignIn,getOrdersController);


//all orders
router.get("/all-orders",requireSignIn,isAdmin,getAllOrdersController)


//order status update
router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController)
export default router;
