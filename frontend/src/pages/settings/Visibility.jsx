import {
  faComment,
  faEye,
  faImage,
  faMessage,
  faUserShield,
  faUserTag
} from "@fortawesome/free-solid-svg-icons";
import { MenuItem } from "@mui/material";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { makeRequest } from "../../axios";
import { SingleSettingComponent } from "../../utility/UtilityComponents";
import { settingKeys } from "../../utility/enums";
import "./settings.css";

export default function Visibility() {
  const [err, setErr] = useState(null);
  const [activityStatus, setActivityStatus] = useState(false);

  const [directMessageVisibility, setDirectMessageVisibility] = useState(0);
  const [commentVisibility, setCommentVisibility] = useState(0);
  const [postVisibility, setPostVisibility] = useState(0);
  const [discoverabilityVisibility, setDiscoverabilityVisibility] = useState(0);
  const [tagVisibility, setTagVisibility] = useState(0);

  const visibilitySetting = useQuery({
    queryKey: ["visibilitySetting"],
    queryFn: () => {
      makeRequest
        .get(`/settings/get/${settingKeys.activityStatus.key}`)
        .then((res) => {
          setActivityStatus(
            res.data == -1 ? true : res.data.value == 1 ? true : false
          );
          return res.data;
        })
        .catch((errr) => console.log(errr));

      makeRequest
        .get(`/settings/get/${settingKeys.commentVisibility.key}`)
        .then((res) => {
          setCommentVisibility(res.data == -1 ? 2 : res.data.value);
          return res.data;
        })
        .catch((errr) => console.log(errr));

      makeRequest
        .get(`/settings/get/${settingKeys.postVisibility.key}`)
        .then((res) => {
          setPostVisibility(res.data == -1 ? 2 : res.data.value);
          return res.data;
        })
        .catch((errr) => console.log(errr));

      makeRequest
        .get(`/settings/get/${settingKeys.discoverabilityVisibility.key}`)
        .then((res) => {
          setDiscoverabilityVisibility(res.data == -1 ? 2 : res.data.value);
          return res.data;
        })
        .catch((errr) => console.log(errr));

      makeRequest
        .get(`/settings/get/${settingKeys.tagVisibility.key}`)
        .then((res) => {
          setTagVisibility(res.data == -1 ? 2 : res.data.value);
          return res.data;
        })
        .catch((errr) => console.log(errr));

      makeRequest
        .get(`/settings/get/${settingKeys.directMessageVisibility.key}`)
        .then((res) => {
          setDirectMessageVisibility(res.data == -1 ? 2 : res.data.value);
          return res.data;
        })
        .catch((errr) => console.log(errr));

      return 1;
    },
  });

  const handleValueChange = (nam, val) => {
    makeRequest
      .put(`/settings/update`, { name: nam, value: val })
      .then((res) => {
        console.log(res.data);
      })
      .catch((errr) => console.error(errr));
  };

  return visibilitySetting.error ? (
    "Something went wrong"
  ) : visibilitySetting.isLoading ? (
    "Loading..."
  ) : (
    <div className="visibility">
      <SingleSettingComponent
        className={"item activity-status"}
        icon={faUserShield}
        name={"Activity status"}
        Comp={
          <Switch
            checked={activityStatus}
            onChange={(e) => {
              e.preventDefault();
              handleValueChange(
                settingKeys.activityStatus.key,
                e.target.checked ? 1 : 0
              );
              setActivityStatus(e.target.checked);
            }}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
      />
      <SingleSettingComponent
        className={"item comments-visibility"}
        icon={faComment}
        name={"Comments"}
        Comp={
          <Select
            value={commentVisibility}
            onChange={(e) => {
              e.preventDefault();
              handleValueChange(
                settingKeys.commentVisibility.key,
                e.target.value
              );
              setCommentVisibility(e.target.value);
            }}
          >
            <MenuItem value={2}>Everyone</MenuItem>
            <MenuItem value={1}>Friends</MenuItem>
            <MenuItem value={0}>None</MenuItem>
          </Select>
        }
      />
      <SingleSettingComponent
        className={"item post-visibility"}
        icon={faImage}
        name={"Post"}
        Comp={
          <Select
            value={postVisibility}
            onChange={(e) => {
              e.preventDefault();
              handleValueChange(settingKeys.postVisibility.key, e.target.value);
              setPostVisibility(e.target.value);
            }}
          >
            <MenuItem value={2}>Everyone</MenuItem>
            <MenuItem value={1}>Friends</MenuItem>
            <MenuItem value={0}>None</MenuItem>
          </Select>
        }
      />
      <SingleSettingComponent
        className={"item discoverability"}
        icon={faEye}
        name={"Discoverability"}
        Comp={
          <Select
            value={discoverabilityVisibility}
            onChange={(e) => {
              e.preventDefault();
              handleValueChange(
                settingKeys.discoverabilityVisibility.key,
                e.target.value
              );
              setDiscoverabilityVisibility(e.target.value);
            }}
          >
            <MenuItem value={2}>Everyone</MenuItem>
            <MenuItem value={1}>Friends</MenuItem>
            <MenuItem value={0}>None</MenuItem>
          </Select>
        }
      />
      <SingleSettingComponent
        className={"item tags-visibility"}
        icon={faUserTag}
        name={"Tags"}
        Comp={
          <Select
            value={tagVisibility}
            onChange={(e) => {
              e.preventDefault();
              handleValueChange(settingKeys.tagVisibility.key, e.target.value);
              setTagVisibility(e.target.value);
            }}
          >
            <MenuItem value={2}>Everyone</MenuItem>
            <MenuItem value={1}>Friends</MenuItem>
            <MenuItem value={0}>None</MenuItem>
          </Select>
        }
      />

      <SingleSettingComponent
        className={"item direct-messages-visibility"}
        icon={faMessage}
        name={"Direct messages"}
        Comp={
          <Select
            value={directMessageVisibility}
            onChange={(e) => {
              e.preventDefault();
              handleValueChange(
                settingKeys.directMessageVisibility.key,
                e.target.value
              );
              setDirectMessageVisibility(e.target.value);
            }}
          >
            <MenuItem value={2}>Everyone</MenuItem>
            <MenuItem value={1}>Friends</MenuItem>
            <MenuItem value={0}>None</MenuItem>
          </Select>
        }
      />
      {err && err}
    </div>
  );
}
