import FeedContainer from "../../components/feed/FeedContainer";
import UserProfile from "../../components/userProfile/UserProfile";

export default function Profile() {
  return (
    <>
      <UserProfile />
      <FeedContainer domain={["profile"]} />
    </>
  );
}
