import { useContext } from "react";

import "./nav.css";

import {
  faEye,
  faHome,
  faMessage,
  faPlus,
  faSearch,
  faSquarePlus,
  faUserTag,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { SingleSettingComponent } from "../../utility/UtilityComponents";
import Switch from "@mui/material/Switch";
import Select from "@mui/material/Select";
import { makeRequest } from "../../axios";

export default function BottomNav() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [state, setState] = useState(true);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
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
          onClick={toggleDrawer(true)}
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
      <Drawer anchor={"bottom"} open={state} onClose={toggleDrawer(false)}>
        <PostSomething story cancelPost={toggleDrawer(false)} />
      </Drawer>
    </nav>
  );
}

const PostSomething = ({ media, story, text, cancelPost }) => {
  const { currentUser } = useContext(AuthContext);

  const [selectedImage, setSelectedImage] = useState(false);
  const [currMedia, setCurrMedia] = useState(null);
  const [currPreviewSrc, setCurrPreviewSrc] = useState(null);

  const previewSource = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setCurrPreviewSrc(reader.result);
    };
  };

  const handleMediaUpload = (e) => {
    setCurrMedia(e.target.files[0]);
    console.log(e.target.files[0]);
    setSelectedImage(true);
    previewSource(e.target.files[0]);
  };

  const imageUpload = (base64) => {
    console.log(base64);
    makeRequest
      .post(`/posts/upload`, { data: JSON.stringify(base64) })
      .then()
      .catch((err) => console.log(err.response.data));
  };

  const handlePost = (e) => {
    e.preventDefault();
    console.log("posted" + currMedia);
    if (!currPreviewSrc) return;

    imageUpload(currPreviewSrc);
  };

  return (
    <div className="post-drawer">
      <div className="top-buttons">
        <label htmlFor="cancel-btn">Cancel</label>
        <label htmlFor="post-btn">Share</label>
        <button type="submit" id="post-btn" onClick={handlePost} />
        <button
          type="button"
          id="cancel-btn"
          onClick={(e) => {
            setCurrMedia(null);
            cancelPost(e);
          }}
        />
      </div>
      {media && (
        <div className="media">
          {!selectedImage && (
            <label htmlFor="file">
              <FontAwesomeIcon className="icon" icon={faPlus} />
              <span>Post something</span>
              <input
                type="file"
                id="file"
                onInput={handleMediaUpload}
                required
              />
            </label>
          )}
          {selectedImage && (
            <div className="post-caption">
              <img alt="not found" src={URL.createObjectURL(currMedia)} />
              <textarea
                name="caption"
                id="caption"
                rows="2"
                placeholder="Write something"
              />
              {/*               <button onClick={() => setSelectedImage(null)}>Remove</button>
               */}
            </div>
          )}
        </div>
      )}
      {story && (
        <div className="post-story">
          {!selectedImage && (
            <label htmlFor="file">
              <FontAwesomeIcon className="icon" icon={faPlusCircle} />
              <span>Add a story</span>
              <input
                type="file"
                id="file"
                onInput={handleMediaUpload}
                required
              />
            </label>
          )}
          {selectedImage && (
            <div className="story-caption">
              {currPreviewSrc && <img alt="not found" src={currPreviewSrc} />}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
