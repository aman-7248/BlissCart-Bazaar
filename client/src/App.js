import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Layout/Routes/Private";
import ForgotPasword from "./pages/Auth/ForgotPasword";
import AdminRoute from "./components/Layout/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";

//helmet is used for Search engine optimaztion (SEO)

//app component me routes likhte hai
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/*when you navigate to dashboard pahle privateroute check honge then dashboard pe navigate hoga */}
        <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
        </Route>
         <Route path="/dashboard" element={<AdminRoute/>}> 
              <Route path="admin" element={<AdminDashboard/>} />
         </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasword/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />{" "}
        {/*if no route matches then this route is executed*/}
      </Routes>
    </>
  );
}

export default App;
