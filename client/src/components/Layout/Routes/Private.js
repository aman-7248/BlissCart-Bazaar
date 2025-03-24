import { useState, useEffect } from "react";
import { useAuth } from "../../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios/unsafe/axios.js";
import Spinner from "../../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  //useEffect(callback, dependencies);
  //✔ useEffect(() => {...}, []) → Runs once on mount.
  //✔ useEffect(() => {...}) → Runs after every render.
  //✔ useEffect(() => {...}, [state]) → Runs only when state/props change.


  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/api/v1/auth/user-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner />;
}
