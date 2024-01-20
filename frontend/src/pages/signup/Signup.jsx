import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
import { apiCalls } from "../../utility/enums";
import "./signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    makeRequest
      .post(apiCalls().auth.add.register, {
        name: inputs.firstname + " " + inputs.lastname,
        username: inputs.username,
        password: inputs.password,
        email: inputs.email,
      })
      .then((res) => {
        navigate("/login");
      })
      .catch((errrr) => {
        setErr(err);
      });

    /*  try {
      await axios.post("http://localhost:8080/api/auth/register", {
        name: inputs.firstname + " " + inputs.lastname,
        username: inputs.username,
        password: inputs.password,
        email: inputs.email,
      });
      navigate("/login");
    } catch (err) {
      setErr(err.response.data);
    } */
  };

  console.log(err);

  return (
    <div className="signup">
      <div className="card">
        <div className="left">
          <h2>
            PumpO Signup
            <br />-
          </h2>
          <p>
            Step into the Lift Life Community! PumpO is your ultimate social hub
            for bodybuilders, powerlifters, and gym lovers. Join the squad now!
          </p>
          <span>Already have an account?</span>
          <Link to="/login">
            <button className="btn btn-primary">Login</button>
          </Link>
        </div>
        <form className="right">
          <input
            type="text"
            name="firstname"
            id=""
            required
            placeholder="First Name"
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastname"
            id=""
            required
            placeholder="Last Name"
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
