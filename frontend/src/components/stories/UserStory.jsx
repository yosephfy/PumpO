import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import reactIcon from "../../assets/react.svg";
import { makeRequest } from "../../axios.js";
import { AuthContext } from "../../context/AuthContext";
import { getImage } from "../../utility/utility.js";
import "./stories.css";

export default function UserStory() {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["UserStories"],
    queryFn: () =>
      makeRequest.get(`/stories/all/${currentUser.id}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="story userStory">
      <div className="user">
        <img
          src={
            error || isLoading
              ? reactIcon
              : data.length === 0
              ? getImage("", "profilePic")
              : getImage(data[0].profilePic, "profilePic")
          }
          alt=""
        />
      </div>
      <img
        src={
          error || isLoading
            ? reactIcon
            : data.length === 0
            ? getImage("")
            : getImage(data[0].data)
        }
        alt=""
      />
      <label htmlFor="storyFiles">
        <FontAwesomeIcon icon={faAdd} />
        <input type="file" name="" id="storyFiles" />
      </label>
      <h5>Add Story</h5>
    </div>
  );
}
