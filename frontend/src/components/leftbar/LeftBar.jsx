import {
  faCirclePlay,
  faMessage,
  faUserFriends
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getImage } from "../../utility/utility";
import "./leftbar.css";

export default function LeftBar() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="leftbar">
      <div className="left-container">
        <div className="menu">
          <Link to={`/profile/${currentUser.id}`}>
            <div className="user">
              <img
                src={getImage(currentUser.profilePic, "profilePic")}
                alt=""
              />
              <h4>{currentUser.username}</h4>
            </div>
          </Link>

          <Link to="/">
            <div className="item">
              <FontAwesomeIcon className="icons" icon={faUserFriends} />
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
        </div>

        <hr />
        <div className="menu">
          <h4 className="others">Your Shortcuts</h4>

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
    </div>
  );
}
