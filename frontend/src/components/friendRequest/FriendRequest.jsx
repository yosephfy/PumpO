import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./friendrequest.css";

import { AuthContext } from "../../context/AuthContext";

import {
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeRequest } from "../../axios";
import { getImage } from "../../utility/utility";

export default function FriendRequest() {
  const { currentUser } = useContext(AuthContext);

  const { error, isLoading, data } = useQuery({
    queryKey: ["friendRequest"],
    queryFn: () =>
      makeRequest.get(`/users/friendRequests/${currentUser.id}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="friend-requests">
      <div className="friend-requests-title">
        <h4>Friend Requests</h4>
        <Link to={`/followreqs`}>
          View more <FontAwesomeIcon icon={faChevronRight} />
        </Link>
      </div>

      {error
        ? "Something went wrong"
        : isLoading
        ? "Loading..."
        : data.slice(0, 4).map((f) => (
            <div className="request" key={f.id}>
              <Link to="/followreqs">
                <div className="info">
                  <div className="user">
                    <img src={getImage(f.profilePic, "profilePic")} alt="" />
                    <h5>{f.name}</h5>
                  </div>
                  <div className="info-name">
                    <p>{f.timestamp}</p>
                  </div>
                </div>
              </Link>
              <div className="action">
                <button className="btn btn-primary">Accept</button>
                <button className="btn btn-red">Delete</button>
              </div>
            </div>
          ))}
    </div>
  );
}
