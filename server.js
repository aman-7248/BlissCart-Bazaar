// ES Module imports
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";   // ✅ CHANGE #1: ES module me __dirname banane ke liye

// ✅ CHANGE #2: __filename aur __dirname ko define karo (kyunki ES modules me nahi milte)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// configure env
dotenv.config(); // loads environment variables from .env file (default: root directory)

// connect DB
connectDB();

// create express app
const app = express();

// middlewares
app.use(cors());  // allow cross-origin requests (frontend & backend alag ports pe hain)
app.use(express.json()); // parse incoming JSON
app.use(morgan("dev"));  // log incoming requests in console


// backend APIs
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
// above means: /api/v1/auth/* => handled by authRoutes etc.

const PORT = process.env.PORT || 8080;


if(process.env.DEV_MODE!=="Devolpment Mode"){
// serve React frontend static files
      app.use(express.static(path.join(__dirname, "client/build")));

//  React Router ke liye: unknown routes pe index.html serve karo
      app.get("*", (req, res) => {
          res.sendFile(path.join(__dirname, "client/build", "index.html"));
      });

}


// optional welcome route
// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to BlissCart Bazaar</h1>");
// });

// start server
app.listen(PORT, () => {
  console.log(
    `Server listening on ${process.env.DEV_MODE} -- PORT ${PORT}`.yellow
  );
});
