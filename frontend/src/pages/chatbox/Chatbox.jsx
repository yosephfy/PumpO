import {
  faArrowAltCircleRight,
  faFileAlt,
  faPaperPlane,
  faPaperclip,
  faX,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/AuthContext";
import { getImage, parseDateTime } from "../../utility/utility";

import "./chatbox.css";

export default function ChatBox() {
  const queryClient = useQueryClient();
  const { userId } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const [attachment, setAttachment] = useState([]);
  const [selectedAttachment, setSelectedAttachment] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const inputRef = useRef();

  useEffect(() => {
    scrollToBottom();
  });

  useEffect(() => {
    if (attachment.length <= 0) setSelectedAttachment(false);
  }, [attachment]);

  const handleRemoveAttachment = (image) => {
    setAttachment((prev) => prev.filter((a) => a != image));
  };

  const previewSource = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setAttachment((prev) => [...prev, reader.result]);
    };
  };

  const handleMediaUpload = (e) => {
    setSelectedAttachment(true);
    console.log(e.target.files["length"]);

    for (let index = 0; index < e.target.files["length"]; index++) {
      const element = e.target.files[index];
      previewSource(element);
      console.log(element);
    }
    /* e.target.files.forEach((element) => {
      console.log(element);
      previewSource(element);
    }); */
    //previewSource(e.target.files[0]);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    inputRef.current.focus();
    if (!newMessage.trim() && attachment.length == 0) {
      return;
    }

    if (attachment.length > 0) {
      attachment.forEach((att) => {
        let attObj = {
          data: JSON.stringify(att),
          receivingId: userId,
        };

        makeRequest
          .post(`/messages/sendAttachment`, attObj)
          .then(() => {
            queryClient.refetchQueries({ queryKey: ["chatbox"] });
            messageData.refetch();
            setSelectedAttachment(false);
            setAttachment([]);
          })
          .catch((err) => console.log(err));
      });
    }

    if (newMessage.trim())
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
                  <SingleMessage
                    key={m.id}
                    message={m}
                    currentUser={currentUser}
                  />
                ))}
          </div>
        </div>
      </div>
      <div className="chat-box-bottom">
        <div className="chat-box-text-area">
          <form onSubmit={handleSendMessage}>
            {selectedAttachment && (
              <div className="attachments">
                {attachment.map((i) => (
                  <div className="attached-image">
                    <img src={i} alt="" />
                    <FontAwesomeIcon
                      className="icon"
                      icon={faXmark}
                      onClick={() => handleRemoveAttachment(i)}
                    />
                  </div>
                ))}
              </div>
            )}
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
              <input
                type="file"
                name=""
                id="CFile"
                multiple
                onChange={handleMediaUpload}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function SingleMessage({ message, currentUser }) {
  if (message.attachment) {
    return (
      <div
        className="single-message"
        name={currentUser.id === message.sendingUserId ? "true" : "false"}
      >
        <img src={message.attachment} alt="" />
        <small>{parseDateTime(message.timestamp)}</small>
      </div>
    );
  } else
    return (
      <div
        className="single-message"
        name={currentUser.id === message.sendingUserId ? "true" : "false"}
      >
        <div className="message-text">{message.data}</div>
        <small>{parseDateTime(message.timestamp)}</small>
      </div>
    );
}
