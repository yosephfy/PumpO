import {
  faComment,
  faHeart,
  faMessage,
  faUserPlus,
  faUserTag,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { MenuItem } from "@mui/material";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { makeRequest } from "../../axios";
import { SingleSettingComponent } from "../../utility/UtilityComponents";
import { apiCalls, settingKeys } from "../../utility/enums";
import "./settings.css";

export default function Notifications() {
  const [err, setErr] = useState(null);
  const [likeNotif, setLikeNotif] = useState(false);
  const [commentNotif, setCommentNotif] = useState(false);
  const [followNotif, setFollowNotif] = useState(false);
  const [friendReqNotif, setFriendReqNotif] = useState(false);
  const [tagNotif, setTagNotif] = useState(false);
  const [directMessageNotif, setDirectMessageNotif] = useState(0);

  const notificationsSetting = useQuery({
    queryKey: ["notificationsSetting"],
    queryFn: () => {
      makeRequest
        .get(apiCalls(settingKeys.likesNotification.key).setting.get.withKey)
        .then((res) => {
          setLikeNotif(
            res.data == -1 ? true : res.data.value == 1 ? true : false
          );
          return res.data;
        })
        .catch((errr) => console.log(errr));

      makeRequest
        .get(apiCalls(settingKeys.commentsNotification.key).setting.get.withKey)
        .then((res) => {
          setCommentNotif(
            res.data == -1 ? true : res.data.value == 1 ? true : false
          );
          return res.data;
        })
        .catch((errr) => console.log(errr));

      makeRequest
        .get(
          apiCalls(settingKeys.newFollowerNotification.key).setting.get.withKey
        )
        .then((res) => {
          setFollowNotif(
            res.data == -1 ? true : res.data.value == 1 ? true : false
          );
          return res.data;
        })
        .catch((errr) => console.log(errr));

      makeRequest
        .get(
          apiCalls(settingKeys.friendReqNotification.key).setting.get.withKey
        )
        .then((res) => {
          setFriendReqNotif(
            res.data == -1 ? true : res.data.value == 1 ? true : false
          );
          return res.data;
        })
        .catch((errr) => console.log(errr));

      makeRequest
        .get(apiCalls(settingKeys.tagNotification.key).setting.get.withKey)
        .then((res) => {
          setTagNotif(
            res.data == -1 ? true : res.data.value == 1 ? true : false
          );
          return res.data;
        })
        .catch((errr) => console.log(errr));

      makeRequest
        .get(
          apiCalls(settingKeys.directMessageNotification.key).setting.get
            .withKey
        )
        .then((res) => {
          setDirectMessageNotif(res.data == -1 ? 2 : res.data.value);
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

  return notificationsSetting.error ? (
    "Something went wrong"
  ) : notificationsSetting.isLoading ? (
    "Loading..."
  ) : (
    <div className="notifications">
      <SingleSettingComponent
        className={"item likes-notification"}
        icon={faHeart}
        name={"Likes"}
        Comp={
          <Switch
            checked={likeNotif}
            onChange={(e) => {
              e.preventDefault();
              handleValueChange(
                settingKeys.likesNotification.key,
                e.target.checked ? 1 : 0
              );
              setLikeNotif(e.target.checked);
            }}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
      />
      <SingleSettingComponent
        className={"item comments-notification"}
        icon={faComment}
        name={"Comments"}
        Comp={
          <Switch
            checked={commentNotif}
            onChange={(e) => {
              e.preventDefault();
              handleValueChange(
                settingKeys.commentsNotification.key,
                e.target.checked ? 1 : 0
              );
              setCommentNotif(e.target.checked);
            }}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
      />
      <SingleSettingComponent
        className={"item new-follower-notification"}
        icon={faUserPlus}
        name={"New follower"}
        Comp={
          <Switch
            checked={followNotif}
            onChange={(e) => {
              e.preventDefault();
              handleValueChange(
                settingKeys.newFollowerNotification.key,
                e.target.checked ? 1 : 0
              );
              setFollowNotif(e.target.checked);
            }}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
      />
      <SingleSettingComponent
        className={"item friend-request-notification"}
        icon={faUsers}
        name={"Friend request"}
        Comp={
          <Switch
            checked={friendReqNotif}
            onChange={(e) => {
              e.preventDefault();
              handleValueChange(
                settingKeys.friendReqNotification.key,
                e.target.checked ? 1 : 0
              );
              setFriendReqNotif(e.target.checked);
            }}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
      />
      <SingleSettingComponent
        className={"item tags-notification"}
        icon={faUserTag}
        name={"Tags"}
        Comp={
          <Switch
            checked={tagNotif}
            onChange={(e) => {
              e.preventDefault();
              handleValueChange(
                settingKeys.tagNotification.key,
                e.target.checked ? 1 : 0
              );
              setTagNotif(e.target.checked);
            }}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
      />

      <SingleSettingComponent
        className={"item direct-messages-notification"}
        icon={faMessage}
        name={"Direct messages"}
        Comp={
          <Select
            value={directMessageNotif}
            onChange={(e) => {
              e.preventDefault();
              handleValueChange(
                settingKeys.directMessageNotification.key,
                e.target.value
              );
              setDirectMessageNotif(e.target.value);
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
