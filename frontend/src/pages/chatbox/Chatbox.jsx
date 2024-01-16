import {
  faArrowAltCircleRight,
  faFileAlt,
  faPaperPlane,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/AuthContext";
import { getImage, parseDateTime } from "../../utility/utility";

import "./chatbox.css";

export default function ChatBox() {
  const { userId } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const { currentUser } = useContext(AuthContext);
  const inputRef = useRef();

  useEffect(() => {
    scrollToBottom();
  });

  const handleSendMessage = async (e) => {
    e.preventDefault();
    inputRef.current.focus();
    if (!newMessage.trim()) {
      return;
    }
    makeRequest
      .post("/messages/send", {
        receivingId: userId,
        data: newMessage,
      })
      .then(() => {
        messageData.refetch();
      })
      .catch((err) => {
        console.error("Error sending message:", err);
      });

    setNewMessage("");
    document.querySelector('input[name="sendMessage"]').value = "";
    scrollToBottom();
  };

  const messageData = useQuery({
    queryKey: ["chatbox", userId],
    queryFn: () =>
      makeRequest.get(`/messages/${userId}`).then((res) => {
        return res.data;
      }),
  });

  const userData = useQuery({
    queryKey: ["chatbox_user", userId],
    queryFn: () =>
      makeRequest.get(`/users/findById/${userId}`).then((res) => {
        return res.data;
      }),
  });

  function scrollToBottom() {
    var messagesDiv = document.getElementsByClassName("chat-box-top");
    if (messagesDiv.length < 1) return;
    messagesDiv[0].scrollTop = messagesDiv[0].scrollHeight;
    console.log(messagesDiv[0].scrollHeight);
  }

  return userData.error ? (
    "Something went wrong..."
  ) : userData.isLoading ? (
    "Loading..."
  ) : (
    <div className="chat-box-body">
      <div className="chat-box">
        <div className="chat-box-top">
          <img src={getImage(userData.data.profilePic, "profilePic")} alt="" />
          <div className="user-name">
            <h3>{userData.data.name}</h3>
            <h3>@{userData.data.username}</h3>
          </div>
          <div className="message-area">
            {messageData.error
              ? "Something went wrong.."
              : messageData.isLoading
              ? "Loading..."
              : messageData.data.map((m) => (
                  <div
                    className="single-message"
                    key={m.id}
                    name={currentUser.id === m.sendingUserId ? "true" : "false"}
                  >
                    <div>{m.data}</div>
                    <small>{parseDateTime(m.timestamp)}</small>
                  </div>
                ))}
          </div>
        </div>
      </div>
      <div className="chat-box-bottom">
        <div className="chat-box-text-area">
          <form onSubmit={handleSendMessage}>
            <input
              ref={inputRef}
              autoFocus
              type="text"
              name="sendMessage"
              id=""
              placeholder="Write Something"
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <div className="action-buttons">
              <label htmlFor="send">
                <FontAwesomeIcon className="icon" icon={faPaperPlane} />
              </label>
              <label htmlFor="CFile" className="">
                <FontAwesomeIcon className="icon" icon={faPaperclip} />
              </label>
              <button id="send" type="submit" className="" />
              <input type="file" name="" id="CFile" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
