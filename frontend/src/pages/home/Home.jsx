import FeedContainer from "../../components/feed/FeedContainer";
import BottomNav from "../../components/nav/BottomNav";
import Stories from "../../components/stories/Stories";

export default function Home() {
  return (
    <div>
      <Stories />
      
      <FeedContainer domain={["followed", "user"]} />
      <BottomNav />
    </div>
  );
}
