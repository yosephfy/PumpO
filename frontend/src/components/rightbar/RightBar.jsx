import React from "react";
import Message from "../message/Message";
import FriendRequest from "../friendRequest/FriendRequest";
import "./rightbar.css";

export default function RightBar() {
  return (
    <div className="rightbar">
      <div className="rightbar-container">
        <Message />
        <FriendRequest />
      </div>
    </div>
  );
}
