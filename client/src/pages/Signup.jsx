import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", data);
      alert("Signup successful");
      navigate("/");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
  <div className="center">
    <div className="card">
      <h2>Create Account</h2>

      <input placeholder="Name"
        onChange={(e)=>setData({...data,name:e.target.value})} />

      <input placeholder="Email"
        onChange={(e)=>setData({...data,email:e.target.value})} />

      <input type="password" placeholder="Password"
        onChange={(e)=>setData({...data,password:e.target.value})} />

      <select onChange={(e)=>setData({...data,role:e.target.value})}>
        <option value="member">Member</option>
        <option value="admin">Admin</option>
      </select>

      <button onClick={handleSignup}>Signup</button>

      <p style={{marginTop:10}}>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  </div>
);
  
}