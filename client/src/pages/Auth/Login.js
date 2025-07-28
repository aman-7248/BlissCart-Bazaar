import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "./../../../node_modules/axios/lib/axios";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Login | BlissCartBazaar">
      <div className="form-container d-flex align-items-center justify-content-center">
        <form onSubmit={handleSubmit} className="shadow p-5 bg-light rounded-100 form-box" >

        <h4 className="text-center mb-4 py-2 text-dark fw-bold border-bottom border-2 border-danger" 
          style={{ fontSize: '2rem', letterSpacing: '1px' }}>
              LOGIN
          </h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter Your Password"
              required
            />
          </div>
           
          <div className="mb-3 text-end">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => navigate(`/forgot-password`)}
            >
              Forgot Password?
            </button>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>

          <div className="text-center mt-3">
            <NavLink to="/register" className="text-decoration-none text-secondary">
              Don't have an account? <span className="text-primary fw-semibold">Register</span>
            </NavLink>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;