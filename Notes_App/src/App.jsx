import { Link } from "react-router-dom";
import "./App.css";
import AllRoutes from "../routes/AllRoutes";
import { useContext } from "react";
import { Context } from "../context/AuthContext";

function App() {
  const {isAuth,isLogout}=useContext(Context)
  return (
    <>
    <h1 id="MainHeading">Notes Application</h1>
      <div id="Mian">
        {isLogout?<Link to="/home" className="links">Home</Link>:null}
        <Link to="/signup" className="links">Signup</Link>
        <Link to="/login" className="links">Login</Link>
        {isAuth?<Link to="/admin" className="links">Admin Dashboard</Link>:null}
      </div>
      <AllRoutes />
    </>
  );
}

export default App;
