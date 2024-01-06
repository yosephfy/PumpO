import { Link } from "react-router-dom";
import "./followrequests.css";
import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { AuthContext } from "../../context/AuthContext";

import reactIcon from "../../assets/react.svg";
import { makeRequest } from "../../Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCheck,
  faChevronRight,
  faCircleCheck,
  faCircleXmark,
  faMessage,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { getImage } from "../../utility/utility";

export default function FollowRequests() {
  const { currentUser } = useContext(AuthContext);

  const { error, isLoading, data, refetch } = useQuery({
    queryKey: ["followRequest"],
    queryFn: () =>
      makeRequest.get(`/users/friendRequests`).then((res) => {
        return res.data;
      }),
  });

  const handleFollow = (followerId) => {
    makeRequest
      .post(`/users/relationships/add`, {
        followedId: currentUser.id,
        followerId: followerId,
      })
      .then((res) => {
        console.log(res.data);
        handleDelete(followerId);
      })
      .catch((error) => console.error("Error accepting request:", error));
  };

  const handleDelete = (followerId) => {
    console.log(followerId, currentUser.id);
    makeRequest
      .delete("/users/friendRequests/delete", {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          requestedId: currentUser.id,
          requestingId: followerId,
        },
      })
      .then((res) => {
        console.log(res.data);
        refetch();
      })
      .catch((error) => console.error("Error deleting request:", error));
  };

  return (
    <div className="follow-requests">
      <div className="follow-requests-title">
        <h4>Friend Requests</h4>
      </div>

      {error
        ? "Something went wrong"
        : isLoading
        ? "Loading..."
        : data.map((f) => (
            <div className="request" key={f.id}>
              <Link to={`/profile/${f.requestingId}`}>
                <div className="info">
                  <div className="user">
                    <img src={getImage(f.profilePic, "profilePic")} alt="" />
                  </div>
                  <div className="info-name">
                    <h5>{f.username}</h5>
                    <p>{f.name}</p>
                  </div>
                </div>
              </Link>
              <div className="action">
                <button
                  className="btn btn-primary"
                  onClick={() => handleFollow(f.requestingId)}
                >
                  <FontAwesomeIcon className="icon" icon={faCircleCheck} />
                  <label>Accept</label>
                </button>
                <button
                  className="btn btn-red"
                  onClick={() => handleDelete(f.requestingId)}
                >
                  <FontAwesomeIcon className="icon" icon={faCircleXmark} />
                  <label>Delete</label>
                </button>
              </div>
            </div>
          ))}
    </div>
  );
}
