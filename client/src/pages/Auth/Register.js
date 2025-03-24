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
      //axios ki help se frontend and backend baat karte hai(put,post,patch,get..)
      //Axios is a JavaScript library used to make HTTP requests from a web browser or Node.js. 
      // It simplifies fetching data from APIs, sending data, and handling responses.
      //res==response comes from backend
      const res = await axios.post(`/api/v1/auth/register`, {
        name,
        email,
        password,
        phone,
        address,
      });
      //jo res hum register ke time bhejege wahi recieve hoga
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
   <Layout title="Register | BlissCartBazaar">
         <div className="form-container" style={{ minHeight: "90vh" }}>
           <form onSubmit={handleSubmit}>  {/*jaise hi hum submit karenge handleSubmit function call hoga*/}
             <h4 className="title">REGISTER FORM</h4>
             <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)} // jo bhi name vale input box mai changes honge 'e'(event) ki help se detect honge aur name mai set ho jayenge
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
              required   //for client side validation
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              //we have added two values ie. value and on change
              //value=email and email changes by usestate(setter function) setemail 
              value={email}
              //on change ->> me humko event milta hai and event ki help se hum value change karte hai
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
              placeholder="Enter Your Phone Number"
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
