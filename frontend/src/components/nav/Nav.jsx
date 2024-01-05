import React, { useContext, useEffect, useRef } from "react";
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
import { useState } from "react";
import { MoreModal } from "../modals/Modals";

export default function Nav() {
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const modalRef = useRef();

  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    let handler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpenMoreModal(false);
      }
    };

    document.addEventListener("mousedown", handler);
  });
  return (
    <nav>
      {openMoreModal && <MoreModal refM={modalRef} />}

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
          <div
            className="menu-btn"
            onClick={() => setOpenMoreModal(!openMoreModal)}
          >
            <Link to="/">
              <FontAwesomeIcon icon={faBars} />
            </Link>
          </div>

          <div className="user">
            <img src={currentUser.profilePic} alt="" />
            <h4>{currentUser.username}</h4>
          </div>
        </div>
      </div>
    </nav>
  );
}
