import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import ReactPlayer from "react-player";

import {
  faComment,
  faHeart,
  faMusic,
  faPlay,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/AuthContext";
import "./videofeed.css";

export default function SingleVideo({ video, isActive, paused }) {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <div className="bottom-content">
        <div className="user-info">
          <label className="username">@yosephmas</label>
          <p className="description">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse minus
            soluta tempore. Doloremque delectus quae repreh
          </p>
        </div>
        <div className="sound">
          <FontAwesomeIcon className="icon" icon={faMusic} />
        </div>
      </div>
      <div className="side-content">
        <div className="user-profile">
          <img src={currentUser.profilePic} alt="" />
        </div>
        <div className="interactions">
          <FontAwesomeIcon className="icon" icon={faHeart} />
          <small>1.9k</small>
        </div>
        <div className="interactions">
          <FontAwesomeIcon className="icon" icon={faComment} />
          <small>1.9k</small>
        </div>
        <div className="interactions">
          <FontAwesomeIcon className="icon" icon={faShare} />
          <small>1.9k</small>
        </div>
      </div>
      {paused && (
        <div className="pause">
          <FontAwesomeIcon className="icon" icon={faPlay} />
        </div>
      )}
      <ReactPlayer
        loop={true}
        className="player"
        key={video.id}
        url={video.url}
        controls={false}
        onPlay={() => {}}
        playing={isActive && !paused}
        playsinline
      />
    </div>
  );
}
