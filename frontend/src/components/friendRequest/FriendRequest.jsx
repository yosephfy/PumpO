import { Link } from "react-router-dom";
import "./friendrequest.css";
import reactIcon from "../../assets/react.svg";

export default function FriendRequest() {
  const requestData = [
    { id: 1, name: "Hanna", info: "2 mutual 4 following" },
    { id: 2, name: "Betty", info: "3 mutual 2 following" },
    { id: 3, name: "John", info: "5 mutual 1 following" },
  ];
  return (
    <div className="friend-requests">
      <h4>Friend Requests</h4>

      {requestData.map((f) => (
        <div className="request" key={f.id}>
          <Link to="/profile:id">
            <div className="info">
              <div className="user">
                <img src={reactIcon} alt="" />
                <h5>{f.name}</h5>
              </div>
              <div className="info-name">
                <p>{f.info}</p>
              </div>
            </div>
          </Link>
          <div className="action">
            <button className="btn btn-primary">Accept</button>
            <button className="btn btn-red">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
