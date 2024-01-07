import { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import "./nav.css";

import {
  faBars,
  faEnvelope,
  faHome,
  faSearch,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getImage } from "../../utility/utility";
import { MoreModal, ProfileModal } from "../modals/Modals";

export default function Nav() {
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const modalRef = useRef();

  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    let handler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpenMoreModal(false);
        setOpenProfileModal(false);
      }
    };

    document.addEventListener("mousedown", handler);
  });
  return (
    <nav>
      {openMoreModal && <MoreModal refM={modalRef} />}
      {openProfileModal && (
        <ProfileModal userInfo={currentUser} refM={modalRef} />
      )}

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

          <div
            className="menu-btn"
            onClick={() => setOpenMoreModal(!openMoreModal)}
          >
            <Link to="/">
              <FontAwesomeIcon icon={faBars} />
            </Link>
          </div>

          <div
            className="user"
            onClick={() => setOpenProfileModal(!openProfileModal)}
          >
            <img src={getImage(currentUser.profilePic, "profilePic")} alt="" />
            <h4>{currentUser.username}</h4>
          </div>
        </div>
      </div>
    </nav>
  );
}
