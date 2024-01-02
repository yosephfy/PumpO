import React, { useState } from "react";
import axios from "axios";
import "./signup.css";
import { Link } from "react-router-dom";
export default function Signup() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/auth/register", inputs);
    } catch (err) {
      setErr(err.response.data);
    }

    
  };

  console.log(err);

  return (
    <div className="signup">
      <div className="card">
        <div className="left">
          <h2>
            NapaExt Signup
            <br />-
          </h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus eos totam molestiae est quis
          </p>
          <span>Already have an account?</span>
          <Link to="/login">
            <button className="btn btn-primary">Login</button>
          </Link>
        </div>
        <form className="right">
          <input
            type="text"
            name="name"
            id=""
            required
            placeholder="Name"
            onChange={handleChange}
          />
          <input
            type="text"
            name="username"
            id=""
            required
            placeholder="Username"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            id=""
            required
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            id=""
            required
            placeholder="Password"
            onChange={handleChange}
          />
          <button className="btn" type="submit" onClick={handleClick}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
