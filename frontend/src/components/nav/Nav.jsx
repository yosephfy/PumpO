import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./nav.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faEnvelope,
  faHome,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import DarkMode from "../darkmode/DarkMode";
import { AuthContext } from "../../context/AuthContext";

export default function Nav() {
  const { currentUser } = useContext(AuthContext);
  return (
    <nav>
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/">
            <h3 className="logo">PumpO</h3>
          </Link>
          <Link to="/" className="home-btn">
            <FontAwesomeIcon icon={faHome} />
          </Link>
          <Link className="profile-btn" to={`/profile/${currentUser.id}`}>
            <FontAwesomeIcon icon={faUser} />
          </Link>
          <div className="nav-SearchBar">
            <FontAwesomeIcon icon={faSearch} />
            <input type="search" name="" id="" />
          </div>
        </div>

        <div className="nav-right">
          <Link to="/messages" className="messages-btn">
            <FontAwesomeIcon icon={faEnvelope} />
          </Link>
          <Link to="/" className="notification-btn">
            <FontAwesomeIcon icon={faBell} />
          </Link>
          <div className="darkmode-btn">
            <DarkMode />
          </div>

          <Link to="/" className="menu-btn">
            <FontAwesomeIcon icon={faBars} />
          </Link>
          <div className="user">
            <img src={currentUser.profilePic} alt="" />
            <h4>{currentUser.username}</h4>
          </div>
        </div>
      </div>
    </nav>
  );
}
