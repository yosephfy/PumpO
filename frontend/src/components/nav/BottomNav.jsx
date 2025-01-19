import { useContext } from "react";
import "./nav.css";

import {
  faHome,
  faMessage,
  faSearch,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { getImage } from "../../utility/utility";
import Posting from "../posting/Posting";

export default function BottomNav() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [postOpenState, setPostOpenState] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setPostOpenState(open);
  };

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
          onClick={() => setPostOpenState(true)}
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
          src={getImage(currentUser?.profilePic, "profilePic") || ""}
          alt=""
          onClick={() => {
            navigate(`/profile/${currentUser.id}`);
          }}
        />
      </div>
      <Posting media openDrawer={postOpenState} toggleDrawer={toggleDrawer} />
    </nav>
  );
}
