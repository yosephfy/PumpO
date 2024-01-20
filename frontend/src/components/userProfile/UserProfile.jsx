import {
  faChevronLeft,
  faEllipsisV,
  faMessage,
  faShare,
  faUserEdit,
  faUserMinus,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/AuthContext";
import { getImage } from "../../utility/utility";
import "./userprofile.css";

export default function UserProfile({ userId }) {
  const { currentUser } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);
  const [requested, setRequested] = useState(false);
  const navigate = useNavigate();

  const userQuery = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () =>
      makeRequest.get(`/users/findById/${userId}`).then((res) => {
        return res.data;
      }),
  });

  const userPostQuery = useQuery({
    queryKey: ["userPosts", userId],
    queryFn: () =>
      makeRequest.get(`/posts/all/${userId}`).then((res) => {
        return res.data.length;
      }),
  });

  const userRelationshipQuery = useQuery({
    queryKey: ["userRelationships", userId],
    queryFn: () =>
      makeRequest.get(`/users/followers/${userId}`).then((res) =>
        makeRequest.get(`/users/followed/${userId}`).then((res2) => {
          let follow = res.data.some((d) => d["followerId"] === currentUser.id);
          setFollowed(follow);
          return {
            followersNum: res.data.length,
            followedNum: res2.data.length,
          };
        })
      ),
  });

  const requestQuery = useQuery({
    queryKey: ["followRequest", userId],
    queryFn: () =>
      makeRequest.get(`/users/friendRequests/${userId}`).then((res) => {
        let request = res.data.some(
          (d) => d["requestingId"] === currentUser.id
        );
        setRequested(request);
        return request;
      }),
  });

  const handleFollow = () => {
    makeRequest
      .post(`/users/follow/${userId}`)
      .then(() => setFollowed(true))
      .catch((error) => console.error("Error following:", error));
    console.log("followed: " + userId);

    userRelationshipQuery.refetch();
    handleCancelRequestFollow();
    setRequested(false);
  };

  const handleRequestFollow = () => {
    makeRequest
      .post(`/users/friendRequests/add`, {
        requestingId: currentUser.id,
        requestedId: userId,
      })
      .then(() => setRequested(true))
      .catch((error) => console.error("Error requesting:", error));
    console.log("requested: " + userId);
    userRelationshipQuery.refetch();
  };
  const handleCancelRequestFollow = () => {
    makeRequest
      .delete(`/users/friendRequests/delete`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          requestedId: userId,
          requestingId: currentUser.id,
        },
      })
      .then(() => setRequested(false))
      .catch((error) => console.error("Error canceling request:", error));
    console.log("canceled request: " + userId);
    userRelationshipQuery.refetch();

    requestQuery.refetch();
  };

  const handleUnfollow = () => {
    makeRequest
      .delete(`/users/unfollow/${userId}`)
      .then(() => {
        setFollowed(false);
        handleCancelRequestFollow();
      })
      .catch((error) => console.error("Error unfollowing:", error));
    console.log("unfollowed: " + userId);
    setRequested(false);
    requestQuery.refetch();
    userRelationshipQuery.refetch();
  };

  return userQuery.error || requestQuery.error ? (
    "Something went wrong"
  ) : userQuery.isLoading || requestQuery.isLoading ? (
    "Loading..."
  ) : (
    <div className="userProfile">
      <div className="top-info">
        <FontAwesomeIcon
          icon={faChevronLeft}
          onClick={() => {
            navigate(-1);
          }}
        />
        <h5>@{userQuery.data.username}</h5>
        <FontAwesomeIcon icon={faEllipsisV} />
      </div>
      <div className="mid-info">
        <div className="user-profile">
          <img src={getImage(userQuery.data.profilePic, "profilePic")} alt="" />
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
          {userId != currentUser.id &&
            !followed &&
            userQuery.data.privateProfile &&
            !requested && (
              <button className="request-follow" onClick={handleRequestFollow}>
                Request Follow
                <FontAwesomeIcon className="icon" icon={faUserPlus} />
              </button>
            )}
          {userId != currentUser.id &&
            !followed &&
            userQuery.data.privateProfile &&
            requested && (
              <button className="requested" onClick={handleCancelRequestFollow}>
                Requested
              </button>
            )}
          {userId != currentUser.id &&
            !followed &&
            !userQuery.data.privateProfile && (
              <button className="follow" onClick={handleFollow}>
                Follow
                <FontAwesomeIcon className="icon" icon={faUserPlus} />
              </button>
            )}
          {userId != currentUser.id && followed && (
            <button className="unfollow" onClick={handleUnfollow}>
              Unfollow
              <FontAwesomeIcon className="icon" icon={faUserMinus} />
            </button>
          )}
          {userId != currentUser.id &&
            (!userQuery.data.privateProfile || followed) && (
              <button
                className="message-btn"
                onClick={() => navigate(`/chatbox/${userId}`)}
              >
                Message <FontAwesomeIcon className="icon" icon={faMessage} />
              </button>
            )}
          {userId == currentUser.id && (
            <button
              className="edit-profile"
              onClick={() => navigate("/editProfile")}
            >
              Edit Profile{" "}
              <FontAwesomeIcon className="icon" icon={faUserEdit} />
            </button>
          )}
          {userId == currentUser.id && (
            <button className="share-profile">
              Share Profile <FontAwesomeIcon className="icon" icon={faShare} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
