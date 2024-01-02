import "./darkmode.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

export default function DarkMode() {
  const DarkHandler = () => {
    document.querySelector("body").classList.toggle("darkmode");
  };

  return (
    <div className="darkmode-icon">
      <FontAwesomeIcon icon={faLightbulb} onClick={DarkHandler} />
    </div>
  );
}
