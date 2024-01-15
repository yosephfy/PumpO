import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/AuthContext";
import { WhatTimeAgo, getImage } from "../../utility/utility";
import "./comment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function Comment({ post }) {
  const { currentUser } = useContext(AuthContext);
  const [newMessage, setNewMessage] = useState("");

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () =>
      makeRequest.get(`/comments/get/post/${post.id}`).then((res) => {
        return res.data;
      }),
  });

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) {
      return; // Prevent sending empty messages
    }
    makeRequest
      .post("/post/add", {
        elementType: "POST",
        postId: post.id,
        desc: newMessage,
      })
      .then(() => {
        refetch();
      })
      .catch((err) => {
        console.error("Error sending message:", err);
      });

    document.querySelector('input[name="sendComment"]').value = "";
    setNewMessage("");
  };

  return (
    <div className="comments">
      <form className="writebox" action="#" onSubmit={handleAddComment}>
        <div className="my-profile-pic">
          <img src={getImage(currentUser.profilePic, "profilePic")} alt="" />
        </div>

        <div className="input-comment">
          <input
            type="text"
            name="sendComment"
            id=""
            placeholder="Write a comment"
            onChange={(e) => setNewMessage(e.target.value)}
          />
        </div>

        <button className="send-button" type="submit">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
      {error
        ? "Something went wrong"
        : isLoading
        ? "Loading..."
        : data.map((c) => (
            <div className="single-comment" key={c.id}>
              <div className="user-profile-pic">
                <img src={getImage(c.profilePic, "profilePic")} alt="" />
              </div>
              <div className="comment-area">
                <h5>{c.name}</h5>
                <p>{c.desc}</p>
              </div>

              <div className="timestamp">
                <small>{WhatTimeAgo(c.timestamp).short}</small>
              </div>
            </div>
          ))}
    </div>
  );
}
