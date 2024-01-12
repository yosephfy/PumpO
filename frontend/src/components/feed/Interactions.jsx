import { faComment, faHeart, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./feed.css";

export default function Interactions({ actions, interactions }) {
  return (
    <div className="bottom-content">
      <div className="action-item">
        <span>
          <FontAwesomeIcon
            className="icon"
            name="heart"
            icon={faHeart}
            onClick={actions.onLike}
            style={{
              color: interactions.likedByUser ? "red" : "var(--color-soft)",
            }}
          />
          <small>{interactions.usersLiked}</small>
        </span>
      </div>
      <div
        className="action-item"
        name="comment"
        onClick={actions.expandComment}
      >
        <span>
          <FontAwesomeIcon className="icon" icon={faComment} />
          <small>{interactions.comments}</small>
        </span>
      </div>
      <div className="action-item" name="share">
        <span>
          <FontAwesomeIcon className="icon" icon={faShare} />
          <small>14</small>
        </span>
      </div>
    </div>
  );
}
