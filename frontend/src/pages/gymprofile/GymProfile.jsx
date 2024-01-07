import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios.js";
import "./gymprofile.css";

export default function GymProfile() {
  const navigate = useNavigate();
  const [age, setAge] = useState(dayjs("2024"));
  const [startingDate, setStartingDate] = useState(dayjs("2024"));
  const [gymType, setGymType] = useState("NOTSET");
  const [weight, setWeight] = useState("NOTSET");

  const handleSelectGymType = (e) => {
    setGymType(e);
    let bb = document.getElementById("bodybuilder");
    let pl = document.getElementById("powerlifter");
    let cl = document.getElementById("calisthenics");
    let ot = document.getElementById("other");

    bb.removeAttribute("name");
    pl.removeAttribute("name");
    cl.removeAttribute("name");
    ot.removeAttribute("name");

    let item = document.getElementById(e);
    item.setAttribute("name", "selected");
  };

  const handleSelectWeightStatus = (e) => {
    setWeight(e);
    let bb = document.getElementById("cutting");
    let pl = document.getElementById("maintaining");
    let cl = document.getElementById("bulking");
    let ot = document.getElementById("notsure");

    bb.removeAttribute("name");
    pl.removeAttribute("name");
    cl.removeAttribute("name");
    ot.removeAttribute("name");

    let item = document.getElementById(e);
    item.setAttribute("name", "selected");
  };

  const HandleSave = (e) => {
    e.preventDefault();
    makeRequest
      .post(`/users/gymProfile/add`, {
        gymType: gymType.toUpperCase(),
        weightStatus: weight.toUpperCase(),
        startingDate: startingDate,
        age: moment(Date.now()).year() - age.year(),
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const HandleSkip = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <div className="gymprofile">
      <div className="card">
        <div className="left">
          <h2>PumpO</h2>
          <p>
            Step into the Lift Life Community! PumpO is your ultimate social hub
            for bodybuilders, powerlifters, and gym lovers. Join the squad now!
          </p>
        </div>
        <form className="right">
          <div className="question">
            <h4>Which best Describes you ? </h4>

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
          <div className="question">
            <h4>How would you describe your current weight journey ? </h4>

            <div className="answer-options">
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
          </div>

          <div className="question">
            <h4>Enter your Birth Year</h4>
            <DatePicker
              className="datepicker"
              label={"Starting Date"}
              views={["year"]}
              value={age}
              onChange={(newValue) => setAge(newValue)}
            />
          </div>
          <div className="question">
            <h4>When did you start your gym journey ?</h4>
            <DatePicker
              className="datepicker"
              label={"Starting Date"}
              views={["month", "year"]}
              value={startingDate}
              onChange={(newValue) => setStartingDate(newValue)}
            />
          </div>

          <div className="action-buttons">
            <button className="btn" type="button" onClick={HandleSkip}>
              Skip
            </button>
            <button className="btn" type="button" onClick={HandleSave}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
