import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { asyncCallWithTimeout } from "../../utility/utility";
import "./login.css";

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

  const handleLogin = (e) => {
    e.preventDefault();
    asyncCallWithTimeout(login(inputs), 2000)
      .then(() => {
        navigate("/");
      })
      .catch((errrrr) => setErr(errrrr.response.data));
    /* try {
    } catch (err) {
      setErr(err.response.data);
    } */
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h2>PumpO</h2>
          <p>
            Step into the Lift Life Community! PumpO is your ultimate social hub
            for bodybuilders, powerlifters, and gym lovers. Join the squad now!
          </p>
          <span>{"Don't have an account?"}</span>
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
