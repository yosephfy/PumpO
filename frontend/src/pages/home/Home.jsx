import FeedContainer from "../../components/feed/FeedContainer";
import Stories from "../../components/stories/Stories";

export default function Home() {
  return (
    <div>
      <Stories />
      <FeedContainer domain={["followed", "user"]} />
    </div>
  );
}
