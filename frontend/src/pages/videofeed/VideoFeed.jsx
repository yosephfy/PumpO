import { useContext, useState } from "react";
import ReactPlayer from "react-player";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import a from "../../assets/videos/a.mp4";
import b from "../../assets/videos/b.mp4";
import c from "../../assets/videos/c.mp4";
import "./videofeed.css";
import {
  faComment,
  faHeart,
  faHome,
  faMusic,
  faPlay,
  faSearch,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/AuthContext";

export default function VideoFeeds() {
  const { currentUser } = useContext(AuthContext);
  const [paused, setPaused] = useState(false);

  const videodata = [
    {
      id: 1,
      url: a,
    },
    {
      id: 2,
      url: b,
    },
    {
      id: 3,
      url: c,
    },
  ];

  return (
    <div className="video-feed-container">
      <div className="top-content">
        <div>
          <FontAwesomeIcon className="icon" icon={faHome} />
        </div>
        <div className="middle">
          <div>Following</div>
          <div>|</div>
          <div>For You</div>
        </div>
        <div>
          <FontAwesomeIcon className="icon" icon={faSearch} />
        </div>
      </div>
      <Swiper
        className="video-feed"
        autoplay={false}
        watchSlidesProgress={false}
        direction="vertical"
        style={{ position: "relative" }}
      >
        {videodata.map((data) => (
          <SwiperSlide
            className="single-video"
            key={data.id}
            onClick={() => setPaused((prev) => !prev)}
          >
            {({ isActive }) => {
              return (
                <div>
                  <div className="bottom-content">
                    <div className="user-info">
                      <label className="username">@yosephmas</label>
                      <p className="description">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Esse minus soluta tempore. Doloremque delectus
                        quae repreh
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
                    key={data.id}
                    url={data.url}
                    controls={false}
                    onPlay={() => {}}
                    playing={isActive && !paused}
                    playsinline
                  />
                </div>
              );
            }}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
