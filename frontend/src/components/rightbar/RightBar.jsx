import FriendRequest from "../friendRequest/FriendRequest";
import Message from "../message/MessageBar";
import "./rightbar.css";

export default function RightBar() {
  return (
    <div className="rightbar">
      <div className="rightbar-container">
        <Message />
        <FriendRequest />
      </div>
    </div>
  );
}
