import { Link } from "react-router-dom";
import "./messages.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";
import { makeRequest } from "../../Axios";
import { useQuery } from "@tanstack/react-query";
import {
  faBars,
  faChevronRight,
  faMessage,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { parseDateTime } from "../../utility/utility";

export default function MessageBar() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["messageBar"],
    queryFn: () =>
      makeRequest.get(`/messages/list`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="messages">
      <div className="messages-top">
        <h4>Messages</h4>
        <FontAwesomeIcon icon={faEdit} />
      </div>
      <div className="messages-search">
        <FontAwesomeIcon icon={faSearch} />
        <input type="search" name="" id="" placeholder="Search Message" />
      </div>
      <div className="border-div"></div>

      {error
        ? "Something went wrong..."
        : isLoading
        ? "Loading..."
        : data.map((m) => (
            <Link to={`/chatbox/${m.userId}`} key={m.id}>
              <div className="message">
                <div className="user">
                  <img src={m.profilePic} alt="" />
                  <div className="green-active"></div>
                </div>
                <div className="message-body">
                  <h5>{m.name}</h5>
                  <p>{m.data}</p>
                </div>
                <small>{parseDateTime(m.timestamp)}</small>
              </div>
            </Link>
          ))}
    </div>
  );
}
