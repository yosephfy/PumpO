import React from "react";
import reactIcon from "../../assets/react.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { makeRequest } from "../../Axios";
import { useQuery } from "@tanstack/react-query";
import "./chatbox.css";
import { useParams } from "react-router";

export default function ChatBox() {
  const { userId } = useParams();
  const curr = {
    id: 2,
    name: "Brs bdmds bartholo",
    username: "buddybo",
    profileImg: reactIcon,
    img: reactIcon,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos incidunt impedit nam aliquid illo saepe perspiciatis inventore et fugit, nesciunt laborum tenetur maxime hic nisi molestias, fuga, vel cum nobis?",
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
          <img src={userData.data.profilePic} alt="" />
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
                    curr={m.userId != m.receivingUserId ? "true" : "false"}
                  >
                    <div>{m.data}</div>
                    <small>{m.timestamp}</small>
                  </div>
                ))}
          </div>
        </div>
      </div>
      <div className="chat-box-bottom">
        <div className="chat-box-text-area">
          <form action="#">
            <input type="text" name="" id="" placeholder="Write Something" />
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
