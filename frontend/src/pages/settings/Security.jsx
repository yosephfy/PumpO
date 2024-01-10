import {
  faMobilePhone,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router";
import { SingleSettingComponent } from "../../utility/UtilityComponents";
import "./settings.css";

export default function Security() {
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="security">
      <SingleSettingComponent
        className={"item security-alert"}
        icon={faTriangleExclamation}
        name={"Security alerts"}
        handleClick={() => navigate("/settings/security/alerts")}
      />
      <SingleSettingComponent
        className={"item manage-device"}
        icon={faMobilePhone}
        name={"Manage devices"}
        handleClick={() => navigate("/settings/security/devices")}
      />
      {err && err}
    </div>
  );
}
