import {
  faBell,
  faBookOpen,
  faBookmark,
  faCirclePlay,
  faGear,
  faMessage,
  faPenToSquare,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { getImage } from "../../utility/utility";
import DarkMode from "../darkmode/DarkMode";
import "./modals.css";
import { makeRequest } from "../../axios";

export const MoreModal = ({ refM, toggleModal }) => {
  const navigate = useNavigate();
  const goTo = (link) => {
    if (!link) return;
    navigate(link);
    toggleModal(false);
  };
  return (
    <div className="modal modal-more" ref={refM}>
      <h3>Menu</h3>
      <div className="items">
        <div onClick={() => goTo("/")}>
          <div className="item">
            <FontAwesomeIcon className="icons" icon={faPenToSquare} />
            <h4>Post</h4>
          </div>
        </div>
        <div onClick={() => goTo("/messages")}>
          <div className="item">
            <FontAwesomeIcon className="icons" icon={faBookOpen} />
            <h4>Story</h4>
          </div>
        </div>
        <div onClick={() => goTo("/")}>
          <div className="item">
            <FontAwesomeIcon className="icons" icon={faBookmark} />
            <h4>Saved</h4>
          </div>
        </div>
        <hr />
        <div onClick={() => goTo("/")}>
          <div className="item">
            <FontAwesomeIcon className="icons" icon={faUser} />
            <h4>Friends</h4>
          </div>
        </div>
        <div onClick={() => goTo("/messages")}>
          <div className="item">
            <FontAwesomeIcon className="icons" icon={faMessage} />
            <h4>Messages</h4>
          </div>
        </div>
        <div onClick={() => goTo("/")}>
          <div className="item">
            <FontAwesomeIcon className="icons" icon={faCirclePlay} />
            <h4>Watch</h4>
          </div>
        </div>
        <div onClick={() => goTo("/")}>
          <div className="item">
            <FontAwesomeIcon className="icons" icon={faCirclePlay} />
            <h4>Gallary</h4>
          </div>
        </div>
        <div onClick={() => goTo("/")}>
          <div className="item">
            <FontAwesomeIcon className="icons" icon={faCirclePlay} />
            <h4>Videos</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProfileModal = ({ userInfo, refM, toggleModal }) => {
  const navigate = useNavigate();
  const goTo = (link) => {
    if (!link) return;
    navigate(link);
    toggleModal(false);
  };
  const handleLogout = (e) => {
    e.preventDefault();
    makeRequest
      .post(`/auth/logout`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="modal modal-profile" ref={refM}>
      <h3>Profile</h3>
      <div className="items">
        <div className="profile">
          <img src={getImage(userInfo.profilePic, "profilePic")} alt="" />
          <div className="profile-info">
            <h4>@{userInfo.username}</h4>
            <h4>{userInfo.email}</h4>
            <h4>{userInfo.name}</h4>
          </div>
        </div>
        <div onClick={() => goTo("/editProfile")}>
          <div className="item">
            <FontAwesomeIcon className="icons" icon={faPenToSquare} />
            <h4>Edit Profile</h4>
          </div>
        </div>
        <div
          onClick={() => {
            goTo("/login");
            handleLogout();
          }}
        >
          <div className="item">
            <FontAwesomeIcon className="icons" icon={faRightFromBracket} />
            <h4>Logout</h4>
          </div>
        </div>
        <div onClick={() => goTo("/settings/notifications")}>
          <div className="item">
            <FontAwesomeIcon className="icons" icon={faBell} />
            <h4>Notification</h4>
          </div>
        </div>
        <hr />
        <div onClick={() => goTo("/settings")}>
          <div className="item">
            <FontAwesomeIcon className="icons" icon={faGear} />
            <h4>Settings & Privacy</h4>
          </div>
        </div>
        <hr />
        <div className="darkmode-item">
          <h4>Toggle Dark Mode</h4>
          <DarkMode />
        </div>
      </div>
    </div>
  );
};
