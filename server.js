import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from './routes/categoryRoutes.js'
import cors from "cors";

//jab require use karte toh file ka extension nahi dete the but ab es6 me file ka extension bhi dena padta hai
//configure env
dotenv.config(); // we give path where .env file is located since in our case it is in root directory no need to give
// syntax ->  dotenv.config({path:'\ff'});
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());  // we use to intigrate frontend and backend ports(becuase backend-8080, frontend-3000)
                  //so that no error occurs
app.use(express.json()); //to send and receive data in json format
app.use(morgan("dev")); //console me print karne ke liye jab bhi req ya response ho

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category",categoryRoutes);
// Iska matlab hai /api/v1/auth se start hone wale saare requests
// (like /api/v1/auth/login, /api/v1/auth/register) ko authRoutes handle karega.

const PORT = process.env.PORT || 8080;
app.get("/", (req, res) => {
  res.send("<h1>Welcome to BlissCart Bazaar</h1>");
});

app.listen(PORT, () => {
  console.log(
    `Server listening on ${process.env.DEV_MODE} -- PORT ${PORT}`.yellow
  );
});
