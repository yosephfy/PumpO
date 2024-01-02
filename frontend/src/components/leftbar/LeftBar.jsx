import React, { useContext } from "react";
import "./leftbar.css";
import { Link } from "react-router-dom";
import reactIcon from "../../assets/react.svg";
import { AuthContext } from "../../context/AuthContext";

export default function LeftBar() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="leftbar">
      <div className="left-container">
        <div className="menu">
          <Link to="/profile/:id">
            <div className="user">
              <img src={currentUser.profilePic} alt="" />
              <h4>{currentUser.username}</h4>
            </div>
          </Link>

          <Link to="/">
            <div className="item">
              <img src={reactIcon} alt="" />
              <h4>Friends</h4>
            </div>
          </Link>
          <Link to="/">
            <div className="item">
              <img src={reactIcon} alt="" />
              <h4>Groups</h4>
            </div>
          </Link>
          <Link to="/">
            <div className="item">
              <img src={reactIcon} alt="" />
              <h4>Watch</h4>
            </div>
          </Link>
        </div>

        <hr />
        <div className="menu">
          <h4 className="others">Your Shortcuts</h4>

          <Link to="/">
            <div className="item">
              <img src={reactIcon} alt="" />
              <h4>Gallary</h4>
            </div>
          </Link>
          <Link to="/">
            <div className="item">
              <img src={reactIcon} alt="" />
              <h4>Videos</h4>
            </div>
          </Link>
          <Link to="/">
            <div className="item">
              <img src={reactIcon} alt="" />
              <h4>Message</h4>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
