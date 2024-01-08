import {
  faCamera,
  faChevronLeft,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker } from "@mui/x-date-pickers";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import reactIcon from "../../assets/react.svg";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/AuthContext";
import "./editprofile.css";

export default function EditProfile() {
  const { currentUser } = useContext(AuthContext);
  const [userInputs, setUserInputs] = useState({
    username: "",
    email: "",
    bio: "",
    name: "",
  });

  const [birthYear, setAge] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [gymType, setGymType] = useState("NOTSET");
  const [weight, setWeight] = useState("NOTSET");
  const [height, setHeight] = useState(0);
  const [err, setErr] = useState(null);
  const [formChanged, setFormChanged] = useState(false);

  const userQuery = useQuery({
    queryKey: ["editprofile", currentUser.id],
    queryFn: () =>
      makeRequest.get(`/users/findById/${currentUser.id}`).then((res) => {
        let userData = res.data;
        setUserInputs({
          username: userData.username,
          email: userData.email,
          bio: userData.bio,
          name: userData.name,
        });
        return res.data;
      }),
  });

  const gymProfileQuery = useQuery({
    queryKey: ["editgymprofile", currentUser.id],
    queryFn: () =>
      makeRequest
        .get(`/users/gymProfile/findByUserId/${currentUser.id}`)
        .then((res) => {
          let userData = res.data;
          setGymType(userData.gymType.toLowerCase());
          setWeight(userData.weightStatus.toLowerCase());
          setAge(dayjs(userData.birthYear));
          setStartingDate(dayjs(userData.startingDate));
          setHeight(userData.height);
          return res.data;
        }),
  });

  useEffect(() => {
    if (
      !gymProfileQuery.error &&
      !gymProfileQuery.isLoading &&
      gymProfileQuery.data
    ) {
      handleSelectGymType(gymType.toLowerCase());
      handleSelectWeightStatus(weight.toLowerCase());
    }
  }, [gymProfileQuery]);

  const handleGoBack = () => {};

  const handleClick = (e) => {
    e.preventDefault();

    makeRequest
      .put(`/users/update`, userInputs)
      .then(() => {
        userQuery.refetch();
        setFormChanged(false);
      })
      .catch((err) => {
        console.error(err);
      });

    makeRequest
      .put(`/users/gymProfile/update`, {
        gymType: gymType.toUpperCase(),
        weightStatus: weight.toUpperCase(),
        startingDate: moment(Date.parse(startingDate.toString())).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        birthYear: moment(Date.parse(birthYear.toString())).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        height: height,
      })
      .then(() => {
        gymProfileQuery.refetch();
        setFormChanged(false);
      })
      .catch((err) => {
        console.error(err);
      });

    console.log(userInputs);
  };

  const handleChange = (e) => {
    setFormChanged(true);
    setUserInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectGymType = (e) => {
    if (e === "notset") {
      return;
    }
    setGymType(e);
    let bb = document.getElementById("bodybuilder");
    let pl = document.getElementById("powerlifter");
    let cl = document.getElementById("calisthenics");
    let ot = document.getElementById("other");

    if (!(bb && pl && cl && ot)) {
      return;
    }

    bb.removeAttribute("name");
    pl.removeAttribute("name");
    cl.removeAttribute("name");
    ot.removeAttribute("name");

    let item = document.getElementById(e);
    if (item) item.setAttribute("name", "selected");
    setFormChanged(true);
  };

  const handleSelectWeightStatus = (e) => {
    if (e === "notset") {
      return;
    }
    setWeight(e);
    let bb = document.getElementById("cutting");
    let pl = document.getElementById("maintaining");
    let cl = document.getElementById("bulking");
    let ot = document.getElementById("notsure");

    if (!(bb && pl && cl && ot)) {
      return;
    }

    bb.removeAttribute("name");
    pl.removeAttribute("name");
    cl.removeAttribute("name");
    ot.removeAttribute("name");

    let item = document.getElementById(e);
    if (item) item.setAttribute("name", "selected");
    setFormChanged(true);
  };

  return userQuery.error || gymProfileQuery.error ? (
    "Something went wrong..."
  ) : userQuery.isLoading || gymProfileQuery.isLoading ? (
    "Loading..."
  ) : (
    <div className="editprofile">
      <div className="editprofile-top">
        <FontAwesomeIcon icon={faChevronLeft} onClick={handleGoBack} />
        <h5>Edit Profile</h5>
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
            className="input"
            type="text"
            name="name"
            id=""
            required
            placeholder="Name"
            defaultValue={userInputs.name}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <h4>Username</h4>
          <input
            className="input"
            type="text"
            name="username"
            id=""
            required
            placeholder="Username"
            defaultValue={userInputs.username}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <h4>Email</h4>
          <input
            className="input"
            type="email"
            name="email"
            id=""
            required
            placeholder="Email"
            defaultValue={userInputs.email}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <h4>Bio</h4>
          <textarea
            className="input"
            type="text"
            name="bio"
            id=""
            required
            placeholder="Bio"
            defaultValue={userInputs.bio}
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
        <div className="height-weight">
          <div className="option">
            <h4>Height</h4>
            <input
              type="number"
              name="name"
              id=""
              required
              placeholder="168.0cm"
              defaultValue={height}
              onChange={(e) => {
                setHeight(e.target.value);
                setFormChanged(true);
              }}
            />
          </div>
          <div className="option">
            <h4>Weight</h4>
            <input
              type="number"
              name="name"
              id=""
              required
              placeholder="188.0lb"
              defaultValue={0}
              onChange={() => {}}
            />
          </div>
        </div>

        <div className="field">
          <h4>Birth Year</h4>
          <DatePicker
            className="datepicker"
            label={"Birth Year"}
            views={["year"]}
            value={birthYear}
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
        <button
          className="btn"
          type="submit"
          onClick={handleClick}
          disabled={!formChanged}
        >
          Save
        </button>
      </div>
    </div>
  );
}
