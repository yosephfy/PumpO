import {
  faCancel,
  faUserLock,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import Switch from "@mui/material/Switch";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { makeRequest } from "../../axios";
import { SingleSettingComponent } from "../../utility/UtilityComponents";
import { settingKeys } from "../../utility/enums";
import "./settings.css";

export default function Privacy() {
  const [err, setErr] = useState(null);
  const [checkedPrivate, setCheckedPrivate] = useState(false);

  const privacySetting = useQuery({
    queryKey: ["privacySetting"],
    queryFn: () =>
      makeRequest
        .get(`/settings/get/${settingKeys.privateProfile.key}`)
        .then((res) => {
          setCheckedPrivate(res.data == 1 ? true : false);
          return res.data;
        })
        .catch((errr) => console.log(errr)),
  });

  const onPrivateChange = (e) => {
    setCheckedPrivate(e.target.checked);

    makeRequest
      .put(`/settings/update`, {
        name: settingKeys.privateProfile.key,
        value: e.target.checked ? 1 : 0,
      })
      .then((res) => console.log(`privacy turned: ${e.target.checked}`))
      .catch((err) => setErr(err));
  };

  return privacySetting.error ? (
    "Something went wrong"
  ) : privacySetting.isLoading ? (
    "Loading..."
  ) : (
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
