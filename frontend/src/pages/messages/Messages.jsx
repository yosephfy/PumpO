import { faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { makeRequest } from "../../axios";
import { getImage, parseDateTime } from "../../utility/utility";
import "./messages.css";

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
                  <img src={getImage(m.profilePic, "profilePic")} alt="" />
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
