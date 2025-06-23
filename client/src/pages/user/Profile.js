import React from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  // context
  const [auth, setAuth] = useAuth();
  //states
  const [name, setName] = useState(""); // first vala getter,second vala setter (name mai value ayega, jo setname se set karenge)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (auth?.user) {
      const { name, email, phone, address } = auth.user;
      setName(name || "");
      setEmail(email || "");
      setPhone(phone || "");
      setAddress(address || "");
    }
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // on submit prevent default behaviour of page refresh by javascript
    try {
      //axios ki help se frontend and backend baat karte hai(put,post,patch,get..)
      //Axios is a JavaScript library used to make HTTP requests from a web browser or Node.js.
      // It simplifies fetching data from APIs, sending data, and handling responses.
      //res==response comes from backend
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      },
    );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        if (ls) {
          const parsedLs = JSON.parse(ls);
          parsedLs.user = data.updatedUser;
          localStorage.setItem("auth", JSON.stringify(parsedLs));
        }
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>
              <div className="form-container" style={{ minHeight: "90vh" }}>
                <form onSubmit={handleSubmit}>
                  {" "}
                  {/*jaise hi hum submit karenge handleSubmit function call hoga*/}
                  <h4 className="title">USER PROFILE</h4>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)} // jo bhi name vale input box mai changes honge 'e'(event) ki help se detect honge aur name mai set ho jayenge
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter Your Name"
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
                      disabled
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
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    UPDATE
                  </button>
                </form>
              </div>
            </h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
