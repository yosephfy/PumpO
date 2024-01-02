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
import { useParams } from "react-router";
import { makeRequest } from "../../Axios";

export default function UserProfile() {
  const { id } = useParams();

  const curr = {
    id: 2,
    name: "Brs bdmds bartholo",
    username: "buddybo",
    profileImg: reactIcon,
    img: reactIcon,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos incidunt impedit nam aliquid illo saepe perspiciatis inventore et fugit, nesciunt laborum tenetur maxime hic nisi molestias, fuga, vel cum nobis?",
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () =>
      makeRequest.get(`/users/findById/${id}`).then((res) => {
        return res.data;
      }),
  });

  return error ? (
    "Something went wrong"
  ) : isLoading ? (
    "Loading..."
  ) : (
    <div className="userProfile">
      <div className="top-info">
        <FontAwesomeIcon icon={faChevronLeft} />
        <h5>@{data.username}</h5>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className="mid-info">
        <div className="user-profile">
          <img src={data.profilePic} alt="" />
          <h5>{data.name}</h5>
        </div>
        <div className="interaction">
          <div className="item">
            <h4>65</h4>
            <h5>Posts</h5>
          </div>
          <div className="item">
            <h4>675</h4>
            <h5>Followers</h5>
          </div>
          <div className="item">
            <h4>776</h4>
            <h5>Following</h5>
          </div>
        </div>
      </div>
      <div className="bottom-info">
        <small>{data.bio}</small>
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
