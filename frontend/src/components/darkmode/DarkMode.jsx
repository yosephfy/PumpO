import "./darkmode.css";

import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function DarkMode() {
  const [mode, setMode] = useState();
  const { settings, changeSettings } = useContext(AuthContext);

  const DarkHandler = () => {
    document.querySelector("body").classList.toggle("darkmode");
    const v = document.querySelector("body").classList.contains("darkmode");
    setMode(v);
    changeSettings({ name: "darkmode", value: v ? 1 : 0 });
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
