import React, {useState} from 'react'
import axios from 'axios';

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    userName: "",
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
        "https://fullstack-notes-app-ja6v.onrender.com/user/signup",
        userDetails,
        { withCredentials: true },
     
      );
      console.log(userData);
      if(userData.data.msg=="user register successfully"){
        alert(`user register successfully`)
      }
      setUserDetails({
        userName: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
      if(error.response.data=='user is exist already'){
        alert(`user is exist already`)
      }else if(error.response.data.error=="Password does not meet the criteria."){
        alert(`Your password should have a Uppercase letter, a Special Character, a Number and length should have atleast 8 Character`)
      }
    }
  };

  return (
    <div >
      <h1 >Register user</h1>
      <form id="loginFrom" onSubmit={handleSubmit}>
        <label htmlFor="userName">Enter your name</label>
        <input
          onChange={handleChange}
          type="text"
          name="userName"
          id="userName"
          value={userDetails.userName}
          placeholder='User Name...'
        />
        <label htmlFor="email">Enter your email</label>
        <input
          onChange={handleChange}
          type="text"
          name="email"
          id="email"
          value={userDetails.email}
          placeholder='abc@gmail.com'
        />
        <label htmlFor="password">Enter your password</label>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          id="password"
          value={userDetails.password}
          placeholder='Password'
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Signup
