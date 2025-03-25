import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import { useNavigate} from "react-router-dom";
import axios from "./../../../node_modules/axios/lib/axios";
import "../../styles/AuthStyles.css";
import { DiWebplatform } from "react-icons/di";


const ForgotPasword = () => {
  const [email, setEmail] = useState(""); // first vala getter,second vala setter (name mai value ayega, jo setname se set karenge)
  const [newPassword, setNewPassword] = useState("");
  const [answer,setAnswer]=useState("");

  const navigate = useNavigate(); // for navigation from one page to other

  // submit karne pe jo data frontend se aa raha hai usko server(backend)mai bhejne k liye "axios" ka use karenge
  const handleSubmit = async (e) => {
    e.preventDefault(); // on submit prevent default behaviour of page refresh by javascript
    try {
      const res = await axios.post(`/api/v1/auth/forgot-password`, {
        email,
        answer,
        newPassword,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Forgot Password|BlisCartBazaar"}>
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">RESET PASSWORD </h4>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your favorite book "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" >
            RESET 
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPasword;
