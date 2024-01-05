import React, { useContext, useState } from "react";
import reactIcon from "../../assets/react.svg";
import { Link } from "react-router-dom";
import "./comment.css";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../Axios";
import { WhatTimeAgo } from "../../utility/utility";

export default function Comment({ post }) {
  const { currentUser } = useContext(AuthContext);
  const [newMessage, setNewMessage] = useState("");

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () =>
      makeRequest.get(`/comments/get/${post.id}`).then((res) => {
        return res.data;
      }),
  });

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) {
      return; // Prevent sending empty messages
    }
    makeRequest
      .post("/comments/add", {
        postId: post.id,
        desc: newMessage,
      })
      .then((res) => {
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
      <div className="writebox">
        <form action="#" onSubmit={handleAddComment}>
          <div className="user">
            <img src={currentUser.profilePic} alt="" />
            <input
              type="text"
              name="sendComment"
              id=""
              placeholder="Write a comment"
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </div>
        </form>
      </div>
      {error
        ? "Something went wrong"
        : isLoading
        ? "Loading..."
        : data.map((c) => (
            <Link to="/profile/:id" key={c.id}>
              <div className="user" key={c.id}>
                <img src={c.profilePic} alt="" />
                <div>
                  <h5>{c.name}</h5>
                  <p>{c.desc}</p>
                </div>
                <small>{WhatTimeAgo(c.timestamp).short}</small>
              </div>
            </Link>
          ))}
    </div>
  );
}
