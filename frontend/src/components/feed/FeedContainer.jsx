import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/AuthContext";
import { apiCalls } from "../../utility/enums";
import Feed from "./Feed";
import "./feed.css";

export default function FeedContainer({ domain }) {
  const params = useParams();
  const { currentUser } = useContext(AuthContext);
  const apiFeedCalls = {
    profile: apiCalls(params.id).feed.get.profile,
    followed: apiCalls(params.id).feed.get.followed,
    user: apiCalls(currentUser.id).feed.get.profile,
    liked: apiCalls(params.id).feed.get.liked,
  };
  const { isLoading, error, data } = useQuery({
    queryKey: ["feed"],
    queryFn: async () => {
      let list = [];
      await Promise.all(
        domain.map(async (element) => {
          try {
            const res = await makeRequest.get(apiFeedCalls[element]);
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
