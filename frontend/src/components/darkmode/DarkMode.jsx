import "./darkmode.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
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
        className="icon"
        icon={faLightbulb}
        onClick={DarkHandler}
        name={`${mode ? "dark" : "light"}`}
      />
    </div>
  );
}
