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
import { apiCalls, settingKeys } from "../../utility/enums";
import "./settings.css";

export default function Privacy() {
  const [err, setErr] = useState(null);
  const [checkedPrivate, setCheckedPrivate] = useState(true);
  const [checkedStatus, setCheckedStatus] = useState(true);

  const privacySetting = useQuery({
    queryKey: ["privacySetting"],
    queryFn: () => {
      makeRequest
        .get(apiCalls(settingKeys.privateProfile.key).setting.get.withKey)
        .then((res) => {
          setCheckedPrivate(
            res.data == -1 ? true : res.data.value == 1 ? true : false
          );
          return res.data;
        })
        .catch((errr) => console.log(errr));

      makeRequest
        .get(apiCalls(settingKeys.activityStatus.key).setting.get.withKey)
        .then((res) => {
          setCheckedStatus(
            res.data == -1 ? true : res.data.value == 1 ? true : false
          );
          return res.data;
        })
        .catch((errr) => console.log(errr));

      return 1;
    },
  });

  const handleValueChange = (nam, val) => {
    makeRequest
      .put(apiCalls().setting.update.setting, { name: nam, value: val })
      .then((res) => {
        console.log(res.data);
      })
      .catch((errr) => console.error(errr));
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
            onChange={(e) => {
              e.preventDefault();
              handleValueChange(
                settingKeys.privateProfile.key,
                e.target.checked ? 1 : 0
              );
              setCheckedPrivate(e.target.checked);
            }}
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
            checked={checkedStatus}
            onChange={(e) => {
              e.preventDefault();
              handleValueChange(
                settingKeys.activityStatus.key,
                e.target.checked ? 1 : 0
              );
              setCheckedStatus(e.target.checked);
            }}
            inputProps={{ "aria-label": "controlled" }}
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
