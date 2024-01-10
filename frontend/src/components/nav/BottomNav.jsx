import { useContext, useEffect, useRef } from "react";

import "./nav.css";

import {
  faHome,
  faMessage,
  faSearch,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";

export default function BottomNav() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-container">
        <FontAwesomeIcon
          onClick={() => {
            navigate("/");
          }}
          className="icon"
          icon={faHome}
        />
        <FontAwesomeIcon
          onClick={() => {
            navigate("/search");
          }}
          className="icon"
          icon={faSearch}
        />
        <FontAwesomeIcon
          onClick={() => {
            navigate("/post");
          }}
          className="icon"
          icon={faSquarePlus}
        />
        <FontAwesomeIcon
          onClick={() => {
            navigate("/messages");
          }}
          className="icon"
          icon={faMessage}
        />
        <img
          className="profilePic"
          src={currentUser.profilePic}
          alt=""
          onClick={() => {
            navigate(`/profile/${currentUser.id}`);
          }}
        />
      </div>
    </nav>
  );
}
