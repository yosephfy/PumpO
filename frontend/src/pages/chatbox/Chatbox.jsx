import React from "react";
import reactIcon from "../../assets/react.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./chatbox.css";

export default function ChatBox() {
  const curr = {
    id: 2,
    name: "Brs bdmds bartholo",
    username: "buddybo",
    profileImg: reactIcon,
    img: reactIcon,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos incidunt impedit nam aliquid illo saepe perspiciatis inventore et fugit, nesciunt laborum tenetur maxime hic nisi molestias, fuga, vel cum nobis?",
  };
  return (
    <div>
      <div className="chat-box">
        <div className="chat-box-top">
          <img src={curr.img} alt="" />
          <div className="user-name">
            <h3>{curr.name}</h3>
            <h3>@{curr.username}</h3>
          </div>
        </div>
        <div className="chat-box-bottom">
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
