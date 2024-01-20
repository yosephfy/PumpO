import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getImage } from "../../utility/utility.js";
import "./stories.css";

export default function UserStory({ handleClick }) {
  const { currentUser } = useContext(AuthContext);

  return (
    <div
      className="userStory"
      onClick={() => {
        handleClick(true);
      }}
    >
      <div className="story-circle">
        <img src={getImage(currentUser.profilePic, "profilePic")} alt="" />
        <label htmlFor="storyFiles">
          <FontAwesomeIcon icon={faAdd} />
        </label>
      </div>

      <h5>Post</h5>
    </div>
  );
}
