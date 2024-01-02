import React, { useContext, useEffect, useState } from "react";
import "./feed.css";
import { Link } from "react-router-dom";
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

  const [likes, setLikes] = useState(0);
  const [currLiked, setCurrLiked] = useState(false);
  const [comments, setComments] = useState(0);
  const [shares, setShares] = useState(0);

  // Fetch initial interaction counts from the API
  useEffect(() => {
    // Replace 'yourApiEndpoint' with the actual endpoint for fetching interactions
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
  }, []); // Run only once on component mount

  const handleLike = () => {
    // Replace 'yourLikeApiEndpoint' with the actual endpoint for posting likes
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
    // Replace 'yourUnlikeApiEndpoint' with the actual endpoint for deleting likes
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
    // Replace 'yourCommentApiEndpoint' with the actual endpoint for posting comments
    makeRequest
      .post("yourCommentApiEndpoint")
      .then(() => setComments((prevComments) => prevComments + 1))
      .catch((error) => console.error("Error posting comment:", error));
  };

  const handleShare = () => {
    // Replace 'yourShareApiEndpoint' with the actual endpoint for posting shares
    makeRequest
      .post("yourShareApiEndpoint")
      .then(() => setShares((prevShares) => prevShares + 1))
      .catch((error) => console.error("Error posting share:", error));
  };
  /*  const [usersLiked, setUsersLiked] = useState(data?.length);
  // const [usersShared, setUsersShared] = useState(feed.usersShared);
  const [hasLiked, setHasLiked] = useState(
    data == undefined ? false : data.some((d) => d["userId"] === currentUser.id)
  );
  // const [hasShared, setHasShared] = useState(feed.hasShared);


  const handleLike = () => {
    if (hasLiked) makeRequest.delete("/likes/delete/" + feed.id);
    else {
      const obj = { userId: currentUser.id, postId: feed.id };
      makeRequest.post("/likes/add", obj);
    }
    setHasLiked(!hasLiked);
    setUsersLiked((hasLiked ? -1 : 1) + usersLiked);
  };
 */
  /**
   * onShare when the user shares a post
   */
  /* const onShare = async () => {
      const response = await request(
        `posts/${feed.id}/share`,
        hasShared ? "DELETE" : "POST",
        {}
      );
      if (response.data) {
        setHasShared(!hasShared);
        setUsersShared((hasShared ? -1 : 1) + usersShared);
      }
    }; */

  /*   const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (liked) => {
      if (liked) return makeRequest.delete("/likes/delete/" + feed.id);
      const obj = { userId: currentUser.id, postId: feed.id };
      return makeRequest.post("/likes/add", obj);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [["likes"]] });
    },
  });



  const handleLike = () => {
    let currLiked = data.some((d) => d["userId"] === currentUser.id);
    console.log(currLiked);
    mutation.mutate(currLiked);
  };
 */
  const [openComment, setOpenComment] = useState(false);
  const commentExpandHandler = () => {
    setOpenComment(!openComment);
  };

  const timeAgo = WhatTimeAgo(feed.createdAt).long;

  // console.log(error);
  return (
    <div className="feed">
      <div className="top-content">
        <Link to="/profile/:id">
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

      {/* <div className="bottom-content">
        <div className="action-item">
          <span>
            <FontAwesomeIcon icon={faHeart} onClick={handleLike} />
            <small>{usersLiked} likes</small>
          </span>
        </div>
        <div className="action-item" onClick={commentHandler}>
          <span>
            <FontAwesomeIcon icon={faComment} />
            <small>14 comments</small>
          </span>
        </div>
        <div className="action-item">
          <span>
            <FontAwesomeIcon icon={faShare} />
            <small>14 shares</small>
          </span>
        </div>
      </div>
      {openComment && <Comment />} */}
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
