import {
  faBars,
  faBell,
  faBookmark,
  faEdit,
  faMessage,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Badge from "@mui/material/Badge";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getImage } from "../../utility/utility";
import Posting from "../posting/Posting";
import "./leftbar.css";

export default function LeftBar() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const goTo = (link) => () => {
    navigate(link);
  };

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
    <div className="leftbar">
      <div className="menu">
        <LeftBarActions
          label={"Messages"}
          icon={faMessage}
          handleClick={goTo(`/messaegs`)}
          badge={8}
        />
        <LeftBarActions
          label={"Notifications"}
          icon={faBell}
          handleClick={goTo(`/notifications`)}
          badge={83}
        />
        <LeftBarActions
          label={"Friends"}
          icon={faUserFriends}
          handleClick={goTo(`/friends`)}
          badge={8}
        />
        <LeftBarActions
          label={"Saved"}
          icon={faBookmark}
          handleClick={goTo(`/saved`)}
        />
        <LeftBarActions
          label={"Post"}
          icon={faEdit}
          handleClick={() => {
            setPostOpenState(true);
          }}
        />
        <Posting
          media
          story
          text
          openDrawer={postOpenState}
          toggleDrawer={toggleDrawer}
        />
        <div
          className="item user-profile"
          onClick={goTo(`/profile/${currentUser.id}`)}
        >
          <img src={getImage(currentUser.profilePic, "profilePic")} alt="" />
          <h4>Profile</h4>
        </div>
      </div>

      <div className="menu">
        <hr />
        <LeftBarActions icon={faBars} label={"More"} handleClick={goTo()} />
      </div>
    </div>
  );
}

const LeftBarActions = ({ label, icon, handleClick, badge }) => {
  return (
    <div className="item" onClick={() => handleClick()}>
      <Badge color="secondary" badgeContent={badge}>
        <FontAwesomeIcon className="icons" icon={icon} />
      </Badge>
      <h4>{label}</h4>
    </div>
  );
};
