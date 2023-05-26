import { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://192.168.247.28:8002/api/user/login/", {
        email: email,
        password: password
    })
    localStorage.setItem("token", response.data.token.access);
    navigate('/home')
  }

  return (
    <div className="register">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name=""
            required="required"
          />
          <span>Email</span>
        </div>
        <div className="input-group">
          <input type="password" name="" value={password}
            onChange={(e) => {
                setPassword(e.target.value);
            }} required="required" />
          <span>Password</span>
        </div>
        <div className="input-group">
          <input type="submit" defaultValue="Login" />
        </div>
      </form>
      <Link to="/register">
        To register<span> Click here</span>
      </Link>
    </div>
  );
};

export default Login;
