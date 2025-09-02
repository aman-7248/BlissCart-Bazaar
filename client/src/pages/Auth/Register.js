import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../../styles/AuthStyles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/send-otp`, {
        name, email, password, phone, address, answer,
      });
      if (res.data.success) {
        toast.success("OTP sent to your email");
        setOtpSent(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error sending OTP");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/verify-otp`, { email, otp });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error verifying OTP");
    }
  };

  return (
    <Layout title="Register | BlissCartBazaar">
      <div className="form-container d-flex align-items-center justify-content-center" style={{ minHeight: "90vh" }}>
        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="shadow p-4 bg-light rounded-100 w-100" style={{ maxWidth: "450px" }}>
            <h4 className="text-center mb-4">REGISTER</h4>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required className="form-control mb-3" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="form-control mb-3" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="form-control mb-3" />
            <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" required className="form-control mb-3" />
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required className="form-control mb-3" />
            <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Favorite Book" required className="form-control mb-3" />
            <button type="submit" className="btn btn-primary w-100">Send OTP</button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="shadow p-4 bg-light rounded-100 w-100" style={{ maxWidth: "450px" }}>
            <h4 className="text-center mb-4">Verify OTP</h4>
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" required className="form-control mb-3" />
            <button type="submit" className="btn btn-success w-100">Verify & Register</button>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default Register;
