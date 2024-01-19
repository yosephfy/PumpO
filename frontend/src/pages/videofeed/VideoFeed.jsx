import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import a from "../../assets/videos/a.mp4";
import b from "../../assets/videos/b.mp4";
import c from "../../assets/videos/c.mp4";
import ListVideos from "../../components/videofeed/ListVideos";
import "./videofeed.css";
import BottomNav from "../../components/nav/BottomNav";

export default function VideoFeeds() {
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

      <ListVideos videos={videodata} />
      <BottomNav />
    </div>
  );
}
