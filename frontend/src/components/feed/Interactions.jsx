/* eslint-disable no-param-reassign */
import React, { useContext, useState, useEffect } from "react";
import "./feed.css";
import Comment from "../comment/Comment";
import { faComment, faHeart, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../context/AuthContext";
import { makeRequest } from "../../Axios";

export default function Interactions({ actions, interactions }) {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <div className="bottom-content">
        <div className="action-item">
          <span>
            <FontAwesomeIcon
              name="heart"
              icon={faHeart}
              onClick={actions.onLike}
              style={{
                color: interactions.likedByUser ? "red" : "grey",
              }}
            />
            <small>{interactions.usersLiked} likes</small>
          </span>
        </div>
        <div
          className="action-item"
          name="comment"
          onClick={actions.expandComment}
        >
          <span>
            <FontAwesomeIcon icon={faComment} />
            <small>{interactions.comments} comments</small>
          </span>
        </div>
        <div className="action-item" name="share">
          <span>
            <FontAwesomeIcon icon={faShare} />
            <small>14 shares</small>
          </span>
        </div>
      </div>
    </div>
  );
}
