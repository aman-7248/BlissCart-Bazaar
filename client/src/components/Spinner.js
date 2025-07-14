import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = ({path="login"}) => {
  const [count, setCount] = useState(3); // 3 seconds tak spinner ko chaleyenge then redirect kara denge
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    //useEffect ke andar kayi sare functions likh sakte hai
    //✔ setInterval → Runs a function at fixed time intervals.
    //✔ clearInterval(intervalId) → Stops the interval when no longer needed.
    // syntax --> let intervalId = setInterval(function, delay, param1, param2, ...);

    const interval = setInterval(() => {setCount((prevValue) => --prevValue)}, 1000);       //1000 == 1sec

    //agar count==0 hogya tabhi and ke aage ki condition execute hogi
    count === 0 &&  
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <>
      <div
        className="d-flex flex-column  justify-content-center align-items-center"
        style={{ height: "100vh", gap: "20px" , color:"green"}}

      >
        <h1 className="Text-center">Redirecting you in {count} seconds</h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
