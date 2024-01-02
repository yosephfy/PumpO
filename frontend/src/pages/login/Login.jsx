import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./login.css";
import { AuthContext } from "../../context/AuthContext";
export default function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h2>NapaExt</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus eos totam molestiae est quis
          </p>
          <span>Don't have an account?</span>
          <Link to="/register">
            <button className="btn btn-primary">Register</button>
          </Link>
        </div>
        <form className="right">
          <input
            type="text"
            name="username"
            id=""
            required
            placeholder="Username"
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
          {err && err}
          <button className="btn" type="submit" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
