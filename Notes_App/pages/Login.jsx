import React, { useContext, useState } from "react";
import { Context } from "../context/AuthContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const {isAuth,setIsAuth}=useContext(Context)
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await axios.post(
        "https://fullstack-notes-app-ja6v.onrender.com/user/login", userDetails, {withCredentials:true}
      );
      console.log(userData);
      setUserDetails({
        email:"",
        password:""
      })
      if(userData.data.msg=="user login successfully."){
        alert(`user login successfully.`)
        setIsAuth(!isAuth)
        navigate('/admin');
      }
    } catch (error) {
      console.log(error);
      if(error.response.data.msg=="user not found please signup first"){
        alert(`User not found please recheck you email.`)
      }
      if(error.response.data.msg=="Invalid password"){
        alert(`Invalid password`)
      }
    }
  };
  return (
    <div>
      <h1>Login here</h1>
      <form id="loginFrom" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          onChange={handleChange}
          type="email"
          name="email"
          id="email"
          value={userDetails.email}
          placeholder="abc@gmail.com"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          id="password"
          value={userDetails.password}
          placeholder="password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
