/* eslint-disable no-param-reassign */
import { faComment, faHeart, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./feed.css";

export default function Interactions({ actions, interactions }) {

  return (
    <div>
      <div className="bottom-content">
        <div className="action-item">
          <span>
            <FontAwesomeIcon
              name="heart"
              icon={faHeart}
              onClick={actions.onLike}
              style={{
                color: interactions.likedByUser ? "red" : "grey",
              }}
            />
            <small>{interactions.usersLiked} likes</small>
          </span>
        </div>
        <div
          className="action-item"
          name="comment"
          onClick={actions.expandComment}
        >
          <span>
            <FontAwesomeIcon icon={faComment} />
            <small>{interactions.comments} comments</small>
          </span>
        </div>
        <div className="action-item" name="share">
          <span>
            <FontAwesomeIcon icon={faShare} />
            <small>14 shares</small>
          </span>
        </div>
      </div>
    </div>
  );
}
