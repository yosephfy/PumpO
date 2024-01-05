import React from "react";
import "./modals.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faBookOpen,
  faBookmark,
  faCirclePlay,
  faFileEdit,
  faMessage,
  faPenToSquare,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

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
