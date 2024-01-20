import { Link } from "react-router-dom";
import "./message.css";

import {
  faChevronRight,
  faEdit,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { apiCalls } from "../../utility/enums";
import { getImage } from "../../utility/utility";

export default function MessageBar() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["messageBar"],
    queryFn: () =>
      makeRequest.get(apiCalls().message.get.list).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="bar-messages">
      <div className="bar-messages-top">
        <h4>Message</h4>
        <FontAwesomeIcon icon={faEdit} />
      </div>
      <div className="bar-messages-search">
        <FontAwesomeIcon icon={faSearch} />
        <input type="search" name="" id="" placeholder="Search Message" />
      </div>
      <div className="border-div"></div>

      {error
        ? "Something went wrong..."
        : isLoading
        ? "Loading..."
        : data.slice(0, 10).map((m) => (
            <Link to={`/chatbox/${m.userId}`} key={m.id}>
              <div className="bar-message">
                <div className="user">
                  <img src={getImage(m.profilePic, "profilePic")} alt="" />
                  <div className="green-active"></div>
                </div>
                <div className="bar-message-body">
                  <h5>{m.name}</h5>
                  <p>{m.data}</p>
                </div>
              </div>
            </Link>
          ))}
      <Link to={``}>
        View more <FontAwesomeIcon icon={faChevronRight} />
      </Link>
    </div>
  );
}
