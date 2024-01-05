import React, { useContext, useState } from "react";
import "./userprofile.css";

import reactIcon from "../../assets/react.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faEllipsisV,
  faChevronLeft,
  faMessage,
  faUserPlus,
  faUserEdit,
  faShare,
  faUserMinus,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { makeRequest } from "../../Axios";

export default function UserProfile() {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);
  const history = useNavigate();

  const handleGoBack = () => {
    history(-1); // This will navigate back to the previous page
  };

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
    queryKey: ["userRelationships", id],
    queryFn: () =>
      makeRequest.get(`/users/followers/${id}`).then((res) =>
        makeRequest.get(`/users/followed/${id}`).then((res2) => {
          let follow = res.data.some((d) => d["followerId"] === currentUser.id);
          setFollowed(follow);
          return {
            followersNum: res.data.length,
            followedNum: res2.data.length,
          };
        })
      ),
  });

  const handleFollow = () => {
    makeRequest
      .post(`/users/follow/${id}`)
      .then(() => setFollowed(true))
      .catch((error) => console.error("Error following:", error));
    console.log("followed: " + id);
    userRelationshipQuery.refetch();
  };

  const handleUnfollow = () => {
    makeRequest
      .delete(`/users/unfollow/${id}`)
      .then(() => setFollowed(false))
      .catch((error) => console.error("Error unfollowing:", error));
    console.log("unfollowed: " + id);
    userRelationshipQuery.refetch();
  };

  return userQuery.error ? (
    "Something went wrong"
  ) : userQuery.isLoading ? (
    "Loading..."
  ) : (
    <div className="userProfile">
      <div className="top-info">
        <FontAwesomeIcon icon={faChevronLeft} onClick={handleGoBack} />
        <h5>@{userQuery.data.username}</h5>
        <FontAwesomeIcon icon={faEllipsisV} />
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
                : userRelationshipQuery.data.followersNum}
            </h4>
            <h5>Followers</h5>
          </div>
          <div className="item">
            <h4>
              {userRelationshipQuery.error
                ? 0
                : userRelationshipQuery.isLoading
                ? 0
                : userRelationshipQuery.data.followedNum}
            </h4>
            <h5>Following</h5>
          </div>
        </div>
      </div>
      <div className="bottom-info">
        <small>{userQuery.data.bio}</small>
        <div className="action-items">
          {id != currentUser.id && !followed && (
            <button className="btn btn-primary" onClick={handleFollow}>
              Follow
              <FontAwesomeIcon icon={faUserPlus} />
            </button>
          )}
          {id != currentUser.id && followed && (
            <button className="btn btn-primary" onClick={handleUnfollow}>
              Unfollow
              <FontAwesomeIcon icon={faUserMinus} />
            </button>
          )}
          {id != currentUser.id && (
            <button
              className="btn btn-primary"
              onClick={() => history(`/chatbox/${id}`)}
            >
              Message <FontAwesomeIcon icon={faMessage} />
            </button>
          )}
          {id == currentUser.id && (
            <button className="btn btn-primary">
              Edit Profile <FontAwesomeIcon icon={faUserEdit} />
            </button>
          )}
          {id == currentUser.id && (
            <button className="btn btn-primary">
              Share Profile <FontAwesomeIcon icon={faShare} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
