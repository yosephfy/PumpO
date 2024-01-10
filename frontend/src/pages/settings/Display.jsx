import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import DarkMode from "../../components/darkmode/DarkMode";
import { SingleSettingComponent } from "../../utility/UtilityComponents";
import "./settings.css";

export default function Display() {
  const [err, setErr] = useState(null);

  return (
    <div className="display">
      <SingleSettingComponent
        className={"item darkmode-display"}
        icon={faLightbulb}
        name={"Toggle Dark Mode"}
        Comp={<DarkMode />}
      />

      {err && err}
    </div>
  );
}
