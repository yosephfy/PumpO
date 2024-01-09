import {
  faCancel,
  faUserLock,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import Switch from "@mui/material/Switch";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/AuthContext";
import { SingleSettingComponent } from "../../utility/UtilityComponents";
import "./settings.css";

export default function Privacy() {
  const { currentUser } = useContext(AuthContext);
  const [err, setErr] = useState(null);
  const [checkedPrivate, setCheckedPrivate] = useState(
    currentUser.privateProfile.trim() == `true` || false
  );
  console.log(currentUser);
  const navigate = useNavigate();

  const onPrivateChange = (e) => {
    setCheckedPrivate(e.target.checked);

    /* makeRequest
      .put(`/users/updatePrivateProfile`, {
        privateProfile: e.target.checked.toString(),
      })
      .then()
      .catch((err) => setErr(err)); */
  };

  return (
    <div className="privacy">
      <SingleSettingComponent
        className={"item private-account"}
        icon={faUserLock}
        name={"Private Account"}
        Comp={
          <Switch
            checked={checkedPrivate}
            onChange={onPrivateChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
      />
      <SingleSettingComponent
        className={"item activity-status"}
        icon={faUserShield}
        name={"Activity status"}
        Comp={
          <Switch
            defaultChecked={false}
            onChange={() => {}}
            inputProps={{ "aria-label": "uncontrolled" }}
          />
        }
      />
      <SingleSettingComponent
        className={"item delete-privacy"}
        icon={faCancel}
        name={"Blocked Accounts"}
        handleClick={() => {}}
      />
      {err && err}
    </div>
  );
}
