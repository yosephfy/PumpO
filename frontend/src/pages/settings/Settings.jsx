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
import { SingleSettingComponent } from "../../utility/UtilityComponents";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Settings() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="main-setting">
      <div className="section">
        <h4>Account</h4>
        <hr />
        <SingleSettingComponent
          className={"item"}
          icon={faUserAlt}
          name="Account"
          handleClick={() => navigate("/settings/account")}
        />
        <SingleSettingComponent
          className={"item"}
          icon={faLock}
          name="Privacy"
          handleClick={() => navigate("/settings/privacy")}
        />
        <SingleSettingComponent
          className={"item"}
          icon={faShield}
          name="Security"
          handleClick={() => navigate("/settings/security")}
        />
        <SingleSettingComponent
          className={"item"}
          icon={faShare}
          name="Share Profile"
          handleClick={() => navigate("/settings/share")}
        />
      </div>
      <div className="section">
        <h4>Content & Display</h4>
        <hr />
        <SingleSettingComponent
          className={"item"}
          icon={faBell}
          name="Notifications"
          handleClick={() => navigate("/settings/notifications")}
        />
        <SingleSettingComponent
          className={"item"}
          icon={faEye}
          name="Audience & Visibility"
          handleClick={() => navigate("/settings/visibility")}
        />
        <SingleSettingComponent
          className={"item"}
          icon={faDisplay}
          name="Display"
          handleClick={() => navigate("/settings/display")}
        />
        <SingleSettingComponent
          className={"item"}
          icon={faCancel}
          name="Blcoked Accounts"
          handleClick={() => navigate("/settings/blocked")}
        />
      </div>
      <div className="section">
        <h4>Support & About</h4>
        <hr />
        <SingleSettingComponent
          className={"item"}
          icon={faFlag}
          name="Report a problem"
          handleClick={() => navigate("/settings/report")}
        />
        <SingleSettingComponent
          className={"item"}
          icon={faMessage}
          name="Support"
          handleClick={() => navigate("/settings/support")}
        />
        <SingleSettingComponent
          className={"item"}
          icon={faInfoCircle}
          name="Terms and Policies"
          handleClick={() => navigate("/settings/terms")}
        />
      </div>
      <div className="section">
        <h4>Login</h4>
        <hr />
        <SingleSettingComponent
          className={"item"}
          icon={faExchange}
          name="Switch account"
          handleClick={() => navigate("/settings/login")}
          Comp={<img className="profilePic" src={currentUser.profilePic} />}
        />
        <SingleSettingComponent
          className={"item"}
          icon={faRightFromBracket}
          name="Logout"
          handleClick={() => navigate("/register")}
        />
      </div>
    </div>
  );
}
