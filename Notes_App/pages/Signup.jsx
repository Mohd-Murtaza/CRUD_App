import React from 'react'

const Signup = () => {
  return (
    <div>
      <h1>signup here</h1>
      <form id='loginFrom'>
        <label htmlFor="userName">User Name</label>
        <input type="text" name="userName" id="userName" placeholder='User Name'/>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" placeholder='abc@gmail.com'/>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" placeholder='password'/>
      </form>
    </div>
  )
}

export default Signup
