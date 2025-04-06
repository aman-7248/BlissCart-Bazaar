import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "./../../../node_modules/axios/lib/axios";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  // user jo bhi values login form mai fill karega sabse pahle unko hold karana padega, then usko server pe bhejenge
  // get values, store in a variable, when network request will call then pass these values to server
  // for that we will use state(React states)
  const [email, setEmail] = useState(""); // first vala getter,second vala setter (name mai value ayega, jo setname se set karenge)
  const [password, setPassword] = useState("");

  const [auth, setAuth] = useAuth(); // useauth is the custom hook that we have created in auth.js(context)

  const navigate = useNavigate(); // for navigation from one page to other
  const location = useLocation();

  // submit karne pe jo data frontend se aa raha hai usko server(backend)mai bhejne k liye "axios" ka use karenge
  const handleSubmit = async (e) => {
    e.preventDefault(); // on submit prevent default behaviour of page refresh by javascript
    try {
      const res = await axios.post(`/api/v1/auth/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          // jitna bhi auth data us user se related hoga voh sab set ho jayega so that context ki help se koi bhi use kar sake(isilye auth data store karna jaruri hai)
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data)); // store data in local storage
        navigate(location.state || "/"); // when successfully logged in navigate to home page
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
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>
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
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(`/forgot-password`)}
            >
              FORGOT PASSWORD
            </button>
          </div>

          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
