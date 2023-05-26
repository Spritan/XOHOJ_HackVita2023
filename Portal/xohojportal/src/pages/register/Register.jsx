import "./register.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://192.168.247.28:8002/api/user/register/",
      {
        tc: true,
        name: name,
        email: email,
        password: password,
        password2: cPassword,
      }
    );
    console.log(response);
    if (response) {
      navigate("/home");
    } else {
      console.log("error");
    }
  };

  return (
    <div className="login">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            name=""
            required="required"
          />
          <span>Name</span>
        </div>
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
          <input
            type="password"
            name=""
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required="required"
          />
          <span>Password</span>
        </div>
        <div className="input-group">
          <input
            type="password"
            name=""
            value={cPassword}
            onChange={(e) => {
              setCPassword(e.target.value);
            }}
            required="required"
          />
          <span>Confirm Password</span>
        </div>
        <div className="input-group">
          <input type="submit" defaultValue="Login" />
        </div>
      </form>
      <Link to="/">
        To login<span> &nbsp; Click here</span>
      </Link>
    </div>
  );
};

export default Register;
