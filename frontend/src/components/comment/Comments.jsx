import { faPaperPlane, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useRef, useState } from "react";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/AuthContext";
import { getImage } from "../../utility/utility";
import SingleComment from "./SingleComment";
import "./comment.css";

export default function Comment({ post }) {
  const queryClient = useQueryClient();

  const inputRef = useRef(null);

  const { currentUser } = useContext(AuthContext);
  const [newMessage, setNewMessage] = useState("");
  const [reply, setReply] = useState(null);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () =>
      makeRequest.get(`/comments/get/post/${post.id}`).then((res) => {
        return res.data;
      }),
  });

  const handleAddComment = async (e) => {
    setReply(null);
    e.preventDefault();
    if (!newMessage.trim()) {
      return; // Prevent sending empty messages
    }

    if (!reply) {
      makeRequest
        .post("/comments/post/add", {
          elementType: "POST",
          postId: post.id,
          desc: newMessage,
        })
        .then(() => {
          refetch();
          queryClient.refetchQueries({ queryKey: ["subComment"] });
        })
        .catch((err) => {
          console.error("Error sending message:", err);
        });
    } else {
      makeRequest
        .post("/comments/comment/add", {
          elementType: "COMMENT",
          commentId: reply.id,
          desc: newMessage,
        })
        .then(() => {
          refetch();
          queryClient.refetchQueries({
            queryKey: ["subComment"],
          });
        })
        .catch((err) => {
          console.error("Error sending message:", err);
        });
    }
    document.querySelector('input[name="sendComment"]').value = "";
    setNewMessage("");
  };

  return (
    <div className="comments">
      <form className="writebox" action="#" onSubmit={handleAddComment}>
        <div className="my-profile-pic">
          <img src={getImage(currentUser.profilePic, "profilePic")} alt="" />
        </div>

        <div className="input-comment">
          {reply && (
            <div className="replyto">
              <div className="name">@{reply.username}</div>
              <FontAwesomeIcon
                className="icon"
                icon={faX}
                onClick={() => setReply(null)}
              />
              <small>Reply to</small>
            </div>
          )}
          <input
            type="text"
            name="sendComment"
            id=""
            ref={inputRef}
            placeholder="Write a comment"
            onChange={(e) => setNewMessage(e.target.value)}
          />
        </div>

        <button className="send-button" type="submit">
          <FontAwesomeIcon className="icon" icon={faPaperPlane} />
        </button>
      </form>
      {error
        ? "Something went wrong"
        : isLoading
        ? "Loading..."
        : data.map((c) => (
            <SingleComment
              key={c.id}
              comment={c}
              handleClickComment={setReply}
              focusInput={() => inputRef.current.focus()}
            />
          ))}
    </div>
  );
}
