import {
  faBell,
  faCancel,
  faChevronRight,
  faDisplay,
  faExchange,
  faEye,
  faFlag,
  faInfoCircle,
  faLock,
  faMessage,
  faRightFromBracket,
  faShare,
  faShield,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import "./settings.css";

export default function Settings() {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="section">
        <h4>Account</h4>
        <hr />
        <SingleSetting
          icon={faUserAlt}
          name="Account"
          handleClick={() => navigate("/settings/account")}
        />
        <SingleSetting
          icon={faLock}
          name="Privacy"
          handleClick={() => navigate("/settings/privacy")}
        />
        <SingleSetting
          icon={faShield}
          name="Security"
          handleClick={() => navigate("/settings/security")}
        />
        <SingleSetting
          icon={faShare}
          name="Share Profile"
          handleClick={() => navigate("/settings/share")}
        />
      </div>
      <div className="section">
        <h4>Content & Display</h4>
        <hr />
        <SingleSetting
          icon={faBell}
          name="Notifications"
          handleClick={() => navigate("/settings/notifications")}
        />
        <SingleSetting
          icon={faEye}
          name="Audience & Visibility"
          handleClick={() => navigate("/settings/visibility")}
        />
        <SingleSetting
          icon={faDisplay}
          name="Display"
          handleClick={() => navigate("/settings/display")}
        />
        <SingleSetting
          icon={faCancel}
          name="Blcoked Accounts"
          handleClick={() => navigate("/settings/blocked")}
        />
      </div>
      <div className="section">
        <h4>Support & About</h4>
        <hr />
        <SingleSetting
          icon={faFlag}
          name="Report a problem"
          handleClick={() => navigate("/settings/report")}
        />
        <SingleSetting
          icon={faMessage}
          name="Support"
          handleClick={() => navigate("/settings/support")}
        />
        <SingleSetting
          icon={faInfoCircle}
          name="Terms and Policies"
          handleClick={() => navigate("/settings/terms")}
        />
      </div>
      <div className="section">
        <h4>Login</h4>
        <hr />
        <SingleSetting
          icon={faExchange}
          name="Switch account"
          handleClick={() => navigate("/settings/login")}
        />
        <SingleSetting
          icon={faRightFromBracket}
          name="Logout"
          handleClick={() => navigate("/register")}
        />
      </div>
    </div>
  );
}

const SingleSetting = ({ icon, name, handleClick }) => {
  return (
    <div className="single-setting" onClick={handleClick}>
      <div className="name">
        <FontAwesomeIcon className="icon" icon={icon} />
        <h4>{name}</h4>
      </div>

      <FontAwesomeIcon className="icon" icon={faChevronRight} />
    </div>
  );
};
