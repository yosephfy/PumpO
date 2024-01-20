import { faPlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Drawer from "@mui/material/Drawer";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/AuthContext";
import { apiCalls } from "../../utility/enums";
import "./posting.css";

export default function Posting({
  openDrawer,
  toggleDrawer,
  media,
  story,
  text,
}) {
  const [state, setState] = useState(false);

  useEffect(() => {
    setState(openDrawer);
  }, [openDrawer]);

  return (
    <div>
      <Drawer anchor={"bottom"} open={state} onClose={toggleDrawer(false)}>
        <PostSomething
          media={media}
          story={story}
          text={text}
          cancelPost={toggleDrawer(false)}
        />
      </Drawer>
    </div>
  );
}

const PostSomething = ({ media, story, text, cancelPost }) => {
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [selectedImage, setSelectedImage] = useState(false);
  const [currMedia, setCurrMedia] = useState(null);
  const [currPreviewSrc, setCurrPreviewSrc] = useState(null);
  const [caption, setCaption] = useState("");

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

  const handlePost = (e) => {
    e.preventDefault();
    console.log("posted" + currMedia);
    if (!currPreviewSrc) return;

    console.log(currPreviewSrc);

    let postObj = { img: JSON.stringify(currPreviewSrc), desc: caption };
    if (media)
      makeRequest
        .post(apiCalls().post.add.upload, postObj)
        .then(() => {
          queryClient.refetchQueries({ queryKey: ["feed"] });
          setSelectedImage(false);
        })
        .catch((err) => console.log(err.response.data));

    if (story)
      makeRequest
        .post(apiCalls().story.add.upload, postObj)
        .then(() => {
          queryClient.refetchQueries({ queryKey: ["stories"] });
          setSelectedImage(false);
        })
        .catch((err) => console.log(err.response.data));

    cancelPost(e);
  };

  return (
    <div className="post-drawer">
      <div className="top-buttons">
        <label className="cancel-btn" htmlFor="cancel-btn">
          Cancel
        </label>
        <label
          className="post-btn"
          htmlFor="post-btn"
          aria-disabled={!selectedImage}
        >
          Share
        </label>
        <button
          type="submit"
          id="post-btn"
          onClick={handlePost}
          disabled={!selectedImage}
        />
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
              {currMedia && (
                <img alt="not found" src={URL.createObjectURL(currMedia)} />
              )}
              <textarea
                name="caption"
                id="caption"
                rows="2"
                placeholder="Write something"
                onChange={(e) => {
                  setCaption(e.target.value);
                }}
              />
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
