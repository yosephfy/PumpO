import React from "react";
import Stories from "../../components/stories/Stories";
import FeedContainer from "../../components/feed/FeedContainer";

export default function Home() {
  return (
    <div>
      <Stories />
      <FeedContainer />
    </div>
  );
}
