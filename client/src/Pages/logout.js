import React, { useEffect } from "react";
import axios from "axios"
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useRoutes,useNavigate } from "react-router-dom";
function LogOut() {
  const { logout, authToken } = useContext(AuthContext)
  const navigate = useNavigate();
  useEffect(()=>{
    logout()

    navigate("/");
  })
  return (
    <div>user is now logged Out</div>
  );
}
export default LogOut;