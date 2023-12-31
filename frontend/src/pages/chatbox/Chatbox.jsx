import {
  faArrowAltCircleRight,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useParams } from "react-router";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/AuthContext";
import { getImage, parseDateTime } from "../../utility/utility";
import "./chatbox.css";

export default function ChatBox() {
  const { userId } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const { currentUser } = useContext(AuthContext);

  const handleSendMessage = async (e) => {
    e.preventDefault();
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

  return userData.error ? (
    "Something went wrong..."
  ) : userData.isLoading ? (
    "Loading..."
  ) : (
    <div>
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
          <form action="#" onSubmit={handleSendMessage}>
            <input
              type="text"
              name="sendMessage"
              id=""
              placeholder="Write Something"
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </button>
            <label htmlFor="CFile" className="btn btn-primary">
              <FontAwesomeIcon icon={faFileAlt} />
              <input type="file" name="" id="CFile" />
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}
