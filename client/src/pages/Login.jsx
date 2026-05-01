import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/api/auth/login", data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("email", res.data.email);

      navigate("/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
  <div className="center">
    <div className="card">
      <h2>Welcome Back 👋</h2>

      <input placeholder="Email"
        onChange={(e)=>setData({...data,email:e.target.value})} />

      <input type="password" placeholder="Password"
        onChange={(e)=>setData({...data,password:e.target.value})} />

      <button onClick={handleLogin}>Login</button>

      <p style={{marginTop:10}}>
        New user? <Link to="/signup">Create account</Link>
      </p>
    </div>
  </div>
);
}