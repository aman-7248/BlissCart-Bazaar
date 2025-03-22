import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import axios from "./../../../node_modules/axios/lib/axios";
import "../../styles/AuthStyles.css";

const Register = () => {
  // user jo bhi values register form mai fill karega sabse pahle unko hold karana padega, then usko server pe bhejenge
  // get values, store in a variable, when network request will call then pass these values to server
  // for that we will use state(React states)

  const [name, setName] = useState(""); // first vala getter,second vala setter (name mai value ayega, jo setname se set karenge)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate(); // for navigation from one page to other

  // submit karne pe jo data frontend se aa raha hai usko server(backend)mai bhejne k liye "axios" ka use karenge
  const handleSubmit = async (e) => {
    e.preventDefault(); // on submit prevent default behaviour of page refresh by javascript
    try {
      const res = await axios.post(`/api/v1/auth/register`, {
        name,
        email,
        password,
        phone,
        address,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login"); // when successfully registered navigate to login page
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
   <Layout title="Register - Ecommer App">
         <div className="form-container" style={{ minHeight: "90vh" }}>
           <form onSubmit={handleSubmit}>
             <h4 className="title">REGISTER FORM</h4>
             <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)} // jo bhi name vale input box mai changes honge 'e'(event) ki help se detect honge aur name mai set ho jayenge
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div>
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Phone.No"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Address"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
