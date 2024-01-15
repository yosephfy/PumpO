import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeRequest } from "../../axios.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import { WhatTimeAgo, getImage } from "../../utility/utility.js";
import Comment from "../comment/Comments.jsx";
import Interactions from "./Interactions.jsx";
import "./feed.css";

export default function Feed({ feed }) {
  const { currentUser } = useContext(AuthContext);

  const [likes, setLikes] = useState(0);
  const [currLiked, setCurrLiked] = useState(false);
  const [comments, setComments] = useState(0);
  const [shares, setShares] = useState(0);
  //setShares(0);

  useEffect(() => {
    makeRequest
      .get(`/likes/get/post/${feed.id}`)
      .then((response) => {
        const data = response.data;
        setLikes(data.length || 0);
        setCurrLiked(data.some((d) => d["userId"] === currentUser.id) || false);
      })
      .catch((error) => console.error("Error fetching interactions:", error));

    makeRequest
      .get(`/comments/get/post/${feed.id}`)
      .then((response) => {
        const data = response.data;
        setComments(data.length || 0);
      })
      .catch((error) => console.error("Error fetching interactions:", error));
  }, []);

  const handleLike = () => {
    makeRequest
      .post(`/likes/post/add`, {
        userId: currentUser.id,
        postId: feed.id,
      })
      .then(() => setLikes((prevLikes) => prevLikes + 1))
      .catch((error) => console.error("Error posting like:", error));
    setCurrLiked(true);
    console.log("BRO liked: " + feed.id);
  };

  const handleUnlike = () => {
    makeRequest
      .delete(`/likes/post/delete/${feed.id}`, {
        userId: currentUser.id,
        postId: feed.id,
      })
      .then(() => setLikes((prevLikes) => Math.max(prevLikes - 1, 0)))
      .catch((error) => console.error("Error deleting like:", error));
    setCurrLiked(false);
    console.log("BRO disliked: " + feed.id);
  };

  const [openComment, setOpenComment] = useState(false);
  const commentExpandHandler = () => {
    setOpenComment(!openComment);
  };

  const timeAgo = WhatTimeAgo(feed.createdAt).long;

  // console.log(error);
  return (
    <div className="feed">
      <div className="top-content">
        <Link to={`/profile/${feed.userId}`} reloadDocument>
          <div className="user">
            <img src={getImage(feed.profilePic, "profilePic")} alt="" />
            <div>
              <h5>{feed.username}</h5>
              <small>{timeAgo}</small>
            </div>
          </div>
        </Link>
        <span>
          <FontAwesomeIcon icon={faEllipsisH} />
        </span>
      </div>
      <div className="mid-content">
        <img src={getImage(feed.img, "image")} alt="" />
      </div>

      <Interactions
        actions={{
          onLike: currLiked ? handleUnlike : handleLike,
          onShare: "handleShare",
          expandComment: commentExpandHandler,
        }}
        interactions={{
          usersLiked: likes,
          likedByUser: currLiked,
          comments: comments,
          shares: shares,
        }}
      />
      <div className="feed-caption">
        <p>{feed.desc}</p>
      </div>

      {openComment && <Comment post={feed} />}
    </div>
  );
}
