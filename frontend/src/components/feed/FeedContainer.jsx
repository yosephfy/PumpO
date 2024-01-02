import React, { useContext } from "react";
import "./feed.css";
import Feed from "./Feed";

import reactIcon from "../../assets/react.svg";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../Axios";

export default function FeedContainer() {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["feed"],
    queryFn: () =>
      makeRequest.get(`/feed/followed`).then((res) => {
        return res.data;
      }),
  });
  return (
    <div className="feedcontainer">
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((fee) => <Feed feed={fee} key={fee.id} />)}
    </div>
  );
}
