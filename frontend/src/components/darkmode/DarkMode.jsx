import "./darkmode.css";

import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function DarkMode() {
  const [mode, setMode] = useState();
  const DarkHandler = () => {
    document.querySelector("body").classList.toggle("darkmode");
    setMode(document.querySelector("body").classList.contains("darkmode"));
  };

  return (
    <div className="darkmode-icon">
      <input type="checkbox" name="" id="" />
      <FontAwesomeIcon
        className="darkmode-icon"
        icon={faLightbulb}
        onClick={DarkHandler}
        name={`${mode ? "dark" : "light"}`}
      />
    </div>
  );
}
