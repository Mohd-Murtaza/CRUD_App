import React, { useContext, useState } from "react";
import { Context } from "../context/AuthContext";

const Login = () => {
  const { isAuth, setIsAuth } = useContext(Context);
  const [isLogout,setIsLogout]=useState(false)
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
    setIsAuth(true);
      setIsLogout(true);
    try {
      const userData = await axios.post(
        "https://impossible-tuna-top-coat.cyclic.app/users/login", userDetails, {withCredentials:true}
      );
      console.log(userData);
    
      setUserDetails({
        email:"",
        password:""
      })
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>login here...</h1>
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
        {!isLogout?<button type="submit">Login</button>:<button type="submit">Logout</button>}
      </form>
    </div>
  );
};

export default Login;
