import React, { useContext, useEffect, useState } from "react";
import "./feed.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faListDots,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import Comment from "../comment/Comment";
import { WhatTimeAgo } from "../../utility/utility.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../Axios.js";
import Interactions from "./Interactions.jsx";

export default function Feed({ feed }) {
  const { currentUser } = useContext(AuthContext);
  const history = useNavigate();

  const [likes, setLikes] = useState(0);
  const [currLiked, setCurrLiked] = useState(false);
  const [comments, setComments] = useState(0);
  const [shares, setShares] = useState(0);

  useEffect(() => {
    makeRequest
      .get(`/likes/get/${feed.id}`)
      .then((response) => {
        const data = response.data;
        setLikes(data.length || 0);
        setCurrLiked(data.some((d) => d["userId"] === currentUser.id) || false);
      })
      .catch((error) => console.error("Error fetching interactions:", error));

    makeRequest
      .get(`/comments/get/${feed.id}`)
      .then((response) => {
        const data = response.data;
        setComments(data.length || 0);
      })
      .catch((error) => console.error("Error fetching interactions:", error));
    // setShares(data.shares || 0);
  }, []);

  const handleLike = () => {
    makeRequest
      .post(`/likes/add`, {
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
      .delete(`/likes/delete/${feed.id}`, {
        userId: currentUser.id,
        postId: feed.id,
      })
      .then(() => setLikes((prevLikes) => Math.max(prevLikes - 1, 0)))
      .catch((error) => console.error("Error deleting like:", error));
    setCurrLiked(false);
    console.log("BRO disliked: " + feed.id);
  };

  const handleComment = () => {
    makeRequest
      .post("yourCommentApiEndpoint")
      .then(() => setComments((prevComments) => prevComments + 1))
      .catch((error) => console.error("Error posting comment:", error));
  };

  const handleShare = () => {
    makeRequest
      .post("yourShareApiEndpoint")
      .then(() => setShares((prevShares) => prevShares + 1))
      .catch((error) => console.error("Error posting share:", error));
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
            <img src={feed.profilePic} alt="" />
            <div>
              <h5>{feed.username}</h5>
              <small>{timeAgo}</small>
            </div>
          </div>
        </Link>
        <span>
          <FontAwesomeIcon icon={faListDots} />
        </span>
      </div>
      <div className="mid-content">
        <p>{feed.desc}</p>
        <img src={feed.img} alt="" />
      </div>

      <Interactions
        actions={{
          onLike: currLiked ? handleUnlike : handleLike,
          onComment: handleComment,
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
      {openComment && <Comment post={feed} />}
    </div>
  );
}
