import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate=useNavigate()
  const [userNotes,setUserNotes]=useState([])
  const {isAuth,setIsAuth, isLogout, setIsLogout}=useContext(Context)
  const fetchData=async()=>{
    try {
      const allNotes=await axios.get(
        "https://fullstack-notes-app-ja6v.onrender.com/notes/", {withCredentials:true}
      );
      console.log(allNotes.data.allNotes)
      setUserNotes(allNotes.data.allNotes)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchData()
  },[])
  const handleLogout=async()=>{
    try {
      const logout=await axios.post(`https://fullstack-notes-app-ja6v.onrender.com/user/logout`, {},  {withCredentials:true});
      console.log(logout)
      if(logout.data.msg=="logout successfull"){
        alert(`you are logout successfully`)
        setIsAuth(!isAuth)
        setIsLogout(!isLogout)
        navigate("/home")
      }
    } catch (error) {
      console.log("error")
      console.log(error)
      if(error.response.data.msg=="you already logout!"){
        alert(`you are logedout person!`)
      }
    }
  }
  return (
    <div>
      <div id="allNotesHeadingAndBtnDiv">
       <h1>All Notes...</h1>
       <button onClick={handleLogout}>Logout</button>
      </div>
      <div>
        {userNotes.map((ele, ind) => (
          <div key={ind}>
            <h2>{ele.title}</h2>
            <h4>{ele.description}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
