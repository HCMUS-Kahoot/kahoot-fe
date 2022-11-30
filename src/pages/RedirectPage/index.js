import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function RedirectPage(){
  const {accessToken, refreshToken}=useParams();
  const navigate=useNavigate()
  useEffect(()=>{
    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)
    navigate("/")
  },[])
  return(<div>This is </div>)
}