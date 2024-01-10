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
import { Link } from "react-router-dom";
import { getImage } from "../../utility/utility";
import DarkMode from "../darkmode/DarkMode";
import "./modals.css";

export const MoreModal = (r) => {
  return (
    <div className="modal modal-more" ref={r.refM}>
      <h3>Menu</h3>
      <div className="items">
        <Link to="/">
          <div className="item">
            <FontAwesomeIcon className="icons" icon={faPenToSquare} />
            <h4>Post</h4>
          </div>
        </Link>
        <Link to="/messages">
          <div className="item">
            <FontAwesomeIcon className="icons" icon={faBookOpen} />
            <h4>Story</h4>
          </div>
        </Link>
        <Link to="/">
          <div className="item">
            <FontAwesomeIcon className="icons" icon={faBookmark} />
            <h4>Saved</h4>
          </div>
        </Link>
        <hr />
        <Link to="/">
          <div className="item">
            <FontAwesomeIcon className="icons" icon={faUser} />
            <h4>Friends</h4>
          </div>
        </Link>
        <Link to="/messages">
          <div className="item">
            <FontAwesomeIcon className="icons" icon={faMessage} />
            <h4>Messages</h4>
          </div>
        </Link>
        <Link to="/">
          <div className="item">
            <FontAwesomeIcon className="icons" icon={faCirclePlay} />
            <h4>Watch</h4>
          </div>
        </Link>
        <Link to="/">
          <div className="item">
            <FontAwesomeIcon className="icons" icon={faCirclePlay} />
            <h4>Gallary</h4>
          </div>
        </Link>
        <Link to="/">
          <div className="item">
            <FontAwesomeIcon className="icons" icon={faCirclePlay} />
            <h4>Videos</h4>
          </div>
        </Link>
      </div>
    </div>
  );
};

export const ProfileModal = ({ userInfo, refM }) => {
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
        <Link to="/editProfile">
          <div className="item">
            <FontAwesomeIcon className="icons" icon={faPenToSquare} />
            <h4>Edit Profile</h4>
          </div>
        </Link>
        <Link to="/login">
          <div className="item">
            <FontAwesomeIcon className="icons" icon={faRightFromBracket} />
            <h4>Logout</h4>
          </div>
        </Link>
        <Link to="/settings/notifications">
          <div className="item">
            <FontAwesomeIcon className="icons" icon={faBell} />
            <h4>Notification</h4>
          </div>
        </Link>
        <hr />
        <Link to="/settings" onClick={() => {}}>
          <div className="item">
            <FontAwesomeIcon className="icons" icon={faGear} />
            <h4>Settings & Privacy</h4>
          </div>
        </Link>
        <hr />
        <div className="darkmode-item">
          <h4>Toggle Dark Mode</h4>
          <DarkMode />
        </div>
      </div>
    </div>
  );
};
