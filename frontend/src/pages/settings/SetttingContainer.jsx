import {
  faCab,
  faChevronLeft,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet, useNavigate } from "react-router";

export default function SetttingContainer() {
  const navigate = useNavigate();
  return (
    <div className="settings">
      <div className="top">
        <FontAwesomeIcon icon={faChevronLeft} onClick={() => navigate(-1)} />
        <h3>Settings and Privacy</h3>
        <div />
      </div>

      <Outlet />
    </div>
  );
}
