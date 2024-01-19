import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/AuthContext";
import Feed from "./Feed";
import "./feed.css";

export default function FeedContainer({ domain }) {
  const params = useParams();
  const { currentUser } = useContext(AuthContext);
  const apiCalls = {
    profile: `/feed/profile/${params.id}`,
    followed: `/feed/followed`,
    user: `/feed/profile/${currentUser.id}`,
    liked: `/feed/liked`,
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
            console.error(`Error fetching data for ${element}:`, error);
          }
        })
      );

      if (domain == "liked") {
        return [
          ...new Map(list.map((item) => [item["id"], item])).values(),
        ].sort((a, b) => a.timestamp < b.timestamp);
      }

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
