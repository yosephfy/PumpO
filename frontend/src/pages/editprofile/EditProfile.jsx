import { Link } from "react-router-dom";
import "./editprofile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faCameraAlt,
  faCameraRetro,
  faChevronLeft,
  faEllipsisV,
  faVideoCamera,
} from "@fortawesome/free-solid-svg-icons";
import reactIcon from "../../assets/react.svg";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";

export default function EditProfile() {
  const [age, setAge] = useState(null);
  const [startingDate, setStartingDate] = useState(null);

  const handleClick = () => {};
  const handleChange = () => {};
  const handleGoBack = () => {};
  const handleSelectGymType = () => {};
  const handleSelectWeightStatus = () => {};

  return (
    <div className="editprofile">
      <div className="editprofile-top">
        <FontAwesomeIcon icon={faChevronLeft} onClick={handleGoBack} />
        <h5>@username</h5>
        <FontAwesomeIcon icon={faEllipsisV} />
      </div>
      <div className="profile-img">
        <div className="profile-img-edit">
          <img src={reactIcon} alt="" id="img" />
          <div className="icon">
            <FontAwesomeIcon className="" icon={faCamera} />
          </div>
        </div>
      </div>

      <div className="form">
        <div className="field">
          <h4>Name</h4>
          <input
            type="text"
            name="name"
            id=""
            required
            placeholder="Name"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <h4>Username</h4>
          <input
            type="text"
            name="username"
            id=""
            required
            placeholder="Username"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <h4>Email</h4>
          <input
            type="email"
            name="email"
            id=""
            required
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <h4>Password</h4>
          <input
            type="password"
            name="password"
            id=""
            required
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
      </div>

      <hr />

      <h3>Gym Profile</h3>
      <div className="form">
        <div className="field">
          <h4>Training</h4>
          <div className="answer-options">
            <button
              type="button"
              className={"option"}
              name=""
              id="bodybuilder"
              onClick={() => handleSelectGymType("bodybuilder")}
            >
              <small>Bodybuilder</small>
            </button>
            <button
              type="button"
              className="option"
              name=""
              id="powerlifter"
              onClick={() => handleSelectGymType("powerlifter")}
            >
              <small>Powerlifter</small>
            </button>
            <button
              type="button"
              className="option"
              name=""
              id="calisthenics"
              onClick={() => handleSelectGymType("calisthenics")}
            >
              <small>Calisthenics</small>
            </button>
            <button
              type="button"
              className="option"
              name=""
              id="other"
              onClick={() => handleSelectGymType("other")}
            >
              <small>Other</small>
            </button>
          </div>
        </div>
        <div className="field">
          <h4>Weight Status</h4>
          <div className="answer-options">
            <button
              type="button"
              className={"option"}
              name=""
              id="cutting"
              onClick={() => handleSelectWeightStatus("cutting")}
            >
              <small>Cutting</small>
            </button>
            <button
              type="button"
              className="option"
              name=""
              id="maintaining"
              onClick={() => handleSelectWeightStatus("maintaining")}
            >
              <small>Maintaining</small>
            </button>
            <button
              type="button"
              className="option"
              name=""
              id="bulking"
              onClick={() => handleSelectWeightStatus("bulking")}
            >
              <small>Bulking</small>
            </button>
            <button
              type="button"
              className="option"
              name=""
              id="notsure"
              onClick={() => handleSelectWeightStatus("notsure")}
            >
              <small>Not sure</small>
            </button>
          </div>
        </div>
        <div className="field">
          <h4>Birth Year</h4>
          <DatePicker
            className="datepicker"
            label={"Birth Year"}
            views={["year"]}
            value={age}
            onChange={(newValue) => setAge(newValue)}
          />
        </div>
        <div className="field">
          <h4>Gym Journey Startd</h4>
          <DatePicker
            className="datepicker"
            label={"Starting Date"}
            views={["month", "year"]}
            value={startingDate}
            onChange={(newValue) => setStartingDate(newValue)}
          />
        </div>
      </div>
      <div className="action-buttons">
        <button className="btn" type="submit" onClick={handleClick}>
          Save
        </button>
      </div>
    </div>
  );
}
