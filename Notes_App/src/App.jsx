import { Link } from "react-router-dom";
import "./App.css";
import AllRoutes from "../routes/AllRoutes";
import { useContext } from "react";
import { Context } from "../context/AuthContext";

function App() {
  const {isAuth}=useContext(Context)
  return (
    <>
    <h1 id="MainHeading">Notes Application</h1>
      <div id="Mian">
        <Link to="/">Home</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
        {isAuth?<Link to="/admin">Admin Dashboard</Link>:null}
      </div>
      <AllRoutes />
    </>
  );
}

export default App;
