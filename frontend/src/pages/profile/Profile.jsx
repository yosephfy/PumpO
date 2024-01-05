import React from "react";
import UserProfile from "../../components/userProfile/UserProfile";
import FeedContainer from "../../components/feed/FeedContainer";

export default function Profile() {
  return (
    <>
      <UserProfile />
      <FeedContainer domain={["profile"]} />
    </>
  );
}
