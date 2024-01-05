import React, { useContext } from "react";
import "./feed.css";
import Feed from "./Feed";

import reactIcon from "../../assets/react.svg";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../Axios";
import { useParams } from "react-router";

export default function FeedContainer({ domain }) {
  const params = useParams();
  const { currentUser } = useContext(AuthContext);
  const apiCalls = {
    profile: `/feed/profile/${params.id}`,
    followed: `/feed/followed`,
    user: `/feed/profile/${currentUser.id}`,
  };
  const { isLoading, error, data } = useQuery({
    queryKey: ["feed"],
    queryFn: async () => {
      let list = [];
      await Promise.all(
        domain.map(async (element) => {
          try {
            const res = await makeRequest.get(apiCalls[element]);
            list = list.concat(res.data);
          } catch (error) {
            // Handle errors if needed
            console.error(`Error fetching data for ${element}:`, error);
          }
        })
      );

      return [...new Map(list.map((item) => [item["id"], item])).values()].sort(
        (a, b) => a.createdAt < b.createdAt
      );
    },
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
