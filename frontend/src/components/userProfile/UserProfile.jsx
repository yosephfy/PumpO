import React, { useContext } from "react";
import "./userprofile.css";

import reactIcon from "../../assets/react.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronLeft,
  faMessage,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { makeRequest } from "../../Axios";

export default function UserProfile() {
  const { id } = useParams();

  const userQuery = useQuery({
    queryKey: ["userProfile"],
    queryFn: () =>
      makeRequest.get(`/users/findById/${id}`).then((res) => {
        return res.data;
      }),
  });

  const userPostQuery = useQuery({
    queryKey: ["userPosts"],
    queryFn: () =>
      makeRequest.get(`/posts/all/${id}`).then((res) => {
        return res.data.length;
      }),
  });

  const userRelationshipQuery = useQuery({
    queryKey: ["userRelationships"],
    queryFn: () =>
      makeRequest.get(`/users/followers/${id}`).then((res) =>
        makeRequest.get(`/users/followed/${id}`).then((res2) => {
          return { followers: res.data.length, followed: res2.data.length };
        })
      ),
  });

  return userQuery.error ? (
    "Something went wrong"
  ) : userQuery.isLoading ? (
    "Loading..."
  ) : (
    <div className="userProfile">
      <div className="top-info">
        <FontAwesomeIcon icon={faChevronLeft} />
        <h5>@{userQuery.data.username}</h5>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className="mid-info">
        <div className="user-profile">
          <img src={userQuery.data.profilePic} alt="" />
          <h5>{userQuery.data.name}</h5>
        </div>
        <div className="interaction">
          <div className="item">
            <h4>
              {userPostQuery.error
                ? 0
                : userPostQuery.isLoading
                ? 0
                : userPostQuery.data}
            </h4>
            <h5>Posts</h5>
          </div>
          <div className="item">
            <h4>
              {userRelationshipQuery.error
                ? 0
                : userRelationshipQuery.isLoading
                ? 0
                : userRelationshipQuery.data.followers}
            </h4>
            <h5>Followers</h5>
          </div>
          <div className="item">
            <h4>
              {userRelationshipQuery.error
                ? 0
                : userRelationshipQuery.isLoading
                ? 0
                : userRelationshipQuery.data.followed}
            </h4>
            <h5>Following</h5>
          </div>
        </div>
      </div>
      <div className="bottom-info">
        <small>{userQuery.data.bio}</small>
        <div className="action-items">
          <button className="btn btn-primary">
            Follow
            <FontAwesomeIcon icon={faUserPlus} />
          </button>
          <button className="btn btn-primary">
            Message <FontAwesomeIcon icon={faMessage} />
          </button>
        </div>
      </div>
    </div>
  );
}
