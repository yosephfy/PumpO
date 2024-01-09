import "./settings.css";
import {
  faBackspace,
  faBell,
  faCamera,
  faCancel,
  faChevronLeft,
  faChevronRight,
  faDisplay,
  faEllipsisV,
  faExchange,
  faEye,
  faFlag,
  faInfo,
  faInfoCircle,
  faLock,
  faMessage,
  faRightFromBracket,
  faShare,
  faShield,
  faShopLock,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Settings() {
  return (
    <div className="settings">
      <h3>Settings and Privacy</h3>

      <div className="section">
        <h4>Account</h4>
        <hr />
        <SingleSetting icon={faUserAlt} name="Account" handleClick={() => {}} />
        <SingleSetting icon={faLock} name="Privacy" handleClick={() => {}} />
        <SingleSetting icon={faShield} name="Security" handleClick={() => {}} />
        <SingleSetting
          icon={faShare}
          name="Share Profile"
          handleClick={() => {}}
        />
      </div>
      <div className="section">
        <h4>Content & Display</h4>
        <hr />
        <SingleSetting
          icon={faBell}
          name="Notifications"
          handleClick={() => {}}
        />
        <SingleSetting
          icon={faEye}
          name="Audience & Visibility"
          handleClick={() => {}}
        />
        <SingleSetting icon={faDisplay} name="Display" handleClick={() => {}} />
        <SingleSetting
          icon={faCancel}
          name="Blcoked Accounts"
          handleClick={() => {}}
        />
      </div>
      <div className="section">
        <h4>Support & About</h4>
        <hr />
        <SingleSetting
          icon={faFlag}
          name="Report a problem"
          handleClick={() => {}}
        />
        <SingleSetting icon={faMessage} name="Support" handleClick={() => {}} />
        <SingleSetting
          icon={faInfoCircle}
          name="Terms and Policies"
          handleClick={() => {}}
        />
      </div>
      <div className="section">
        <h4>Login</h4>
        <hr />
        <SingleSetting
          icon={faExchange}
          name="Switch account"
          handleClick={() => {}}
        />
        <SingleSetting
          icon={faRightFromBracket}
          name="Logout"
          handleClick={() => {}}
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
