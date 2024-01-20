import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/AuthContext";
import { WhatTimeAgo, getImage } from "../../utility/utility";
import "./comment.css";
import { apiCalls } from "../../utility/enums";

export default function SingleComment({
  comment,
  handleClickComment,
  focusInput,
}) {
  const { currentUser } = useContext(AuthContext);

  const [likes, setLikes] = useState(0);
  const [currLiked, setCurrLiked] = useState(false);
  const [numOfComments, setNumOfComments] = useState(0);
  const [comments, setComments] = useState([]);
  const [viewReplies, setViewReplies] = useState(false);

  const subComments = useQuery({
    queryKey: ["subComment", comment.id],
    queryFn: () =>
      makeRequest
        .get(`/comments/get/comment/${comment.id}`)
        .then((response) => {
          const data = response.data;
          setComments(data);
          setNumOfComments(data.length || 0);
          return data;
        })
        .catch((error) => []),
  });

  useEffect(() => {
    makeRequest
      .get(apiCalls(comment.id).like.get.fromComment)
      .then((response) => {
        const data = response.data;
        setLikes(data.length || 0);
        setCurrLiked(data.some((d) => d["userId"] === currentUser.id) || false);
      })
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  const handleLike = () => {
    makeRequest
      .post(apiCalls().like.add.comment, {
        userId: currentUser.id,
        commentId: comment.id,
      })
      .then(() => setLikes((prevLikes) => prevLikes + 1))
      .catch((error) => console.error("Error posting like:", error));
    setCurrLiked(true);
    console.log("BRO liked: " + comment.id);
  };

  const handleUnlike = () => {
    makeRequest
      .delete(apiCalls(comment.id).like.delete.comment, {
        userId: currentUser.id,
        commentId: comment.id,
      })
      .then(() => setLikes((prevLikes) => Math.max(prevLikes - 1, 0)))
      .catch((error) => console.error("Error deleting like:", error));
    setCurrLiked(false);
    console.log("BRO disliked: " + comment.id);
  };

  return (
    <div className="single-comment-container">
      <div className="single-comment" key={comment.id}>
        <div className="user-profile-pic">
          <img src={getImage(comment.profilePic, "profilePic")} alt="" />
        </div>
        <div className="comment-area">
          <h5>
            {comment.username}
            {"  "}
            <small>{WhatTimeAgo(comment.timestamp).short}</small>
          </h5>
          <p>{comment.desc}</p>
          <div className="comment-replies">
            <small onClick={() => setViewReplies((prev) => !prev)}>
              View {numOfComments} replies
            </small>
            <small
              onClick={() => {
                handleClickComment(comment);
                focusInput();
              }}
            >
              Reply
            </small>
          </div>
        </div>

        <div className="timestamp like">
          <FontAwesomeIcon
            className="icon"
            style={{
              color: currLiked ? "var(--color-red)" : "var(--color-soft)",
            }}
            icon={faHeart}
            onClick={() => (currLiked ? handleUnlike() : handleLike())}
          />
          <small>{likes}</small>
        </div>
      </div>
      {viewReplies &&
        (subComments.isError
          ? "ERROR"
          : subComments.isLoading
          ? "Loading..."
          : subComments.data.map((c) => (
              <SubComment subComment={c} key={c.id} />
            )))}
    </div>
  );
}

const SubComment = ({ subComment }) => {
  const [likes, setLikes] = useState(0);
  const [currLiked, setCurrLiked] = useState(false);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    makeRequest
      .get(`/likes/get/comment/${subComment.id}`)
      .then((response) => {
        const data = response.data;
        setLikes(data.length || 0);
        setCurrLiked(data.some((d) => d["userId"] === currentUser.id) || false);
      })
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  const handleLike = () => {
    makeRequest
      .post(`/likes/comment/add`, {
        userId: currentUser.id,
        commentId: subComment.id,
      })
      .then(() => setLikes((prevLikes) => prevLikes + 1))
      .catch((error) => console.error("Error posting like:", error));
    setCurrLiked(true);
    console.log("BRO liked: " + subComment.id);
  };

  const handleUnlike = () => {
    makeRequest
      .delete(`/likes/comment/delete/${subComment.id}`, {
        userId: currentUser.id,
        commentId: subComment.id,
      })
      .then(() => setLikes((prevLikes) => Math.max(prevLikes - 1, 0)))
      .catch((error) => console.error("Error deleting like:", error));
    setCurrLiked(false);
    console.log("BRO disliked: " + subComment.id);
  };

  return (
    <div className="single-comment sub-comment">
      <div className="user-profile-pic">
        <img src={getImage(subComment.profilePic, "profilePic")} alt="" />
      </div>
      <div className="comment-area">
        <h5>
          {subComment.username}
          {"  "}
          <small>{WhatTimeAgo(subComment.timestamp).short}</small>
        </h5>
        <p>{subComment.desc}</p>
      </div>

      <div className="timestamp like">
        <FontAwesomeIcon
          className="icon"
          style={{
            color: currLiked ? "var(--color-red)" : "var(--color-soft)",
          }}
          icon={faHeart}
          onClick={() => (currLiked ? handleUnlike() : handleLike())}
        />
        <small>{likes}</small>
      </div>
    </div>
  );
};
