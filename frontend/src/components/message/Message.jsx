import { Link } from "react-router-dom";
import "./message.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";
import reactIcon from "../../assets/react.svg";

export default function Message() {
  const messageData = [
    {
      id: 1,
      img: reactIcon,
      name: "This guy",
      text: "the sdfl sdfjkl dsjfshdj as dfaoifowe ad fsl kdfjlas dfosdjlf",
    },
    {
      id: 1,
      img: reactIcon,
      name: "Bro guy",
      text: " sdfl sdfjkl  as dfaoifowe ad fsl kdfjlas dfosdjlf",
    },
    {
      id: 1,
      img: reactIcon,
      name: "This guy",
      text: "the dsjfshdj as dfaoifowe ad fsl kdfjlas dfosdjlf",
    },
  ];
  return (
    <div className="messages">
      <div className="messages-top">
        <h4>Message</h4>
        <FontAwesomeIcon icon={faEdit} />
      </div>
      <div className="messages-search">
        <FontAwesomeIcon icon={faSearch} />
        <input type="search" name="" id="" placeholder="Search Message" />
      </div>
      <div className="border-div"></div>

      {messageData.map((m) => (
        <Link to="/chatbox/:id">
          <div className="message" key={m.id}>
            <div className="user">
              <img src={m.img} alt="" />
              <div className="green-active"></div>
            </div>
            <div className="message-body">
              <h5>{m.name}</h5>
              <p>{m.text}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
