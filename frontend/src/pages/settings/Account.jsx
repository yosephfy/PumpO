import {
  faEnvelope,
  faTrash,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import { SingleSettingComponent } from "../../utility/UtilityComponents";
import "./settings.css";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { makeRequest } from "../../axios";

export default function Account() {
  const { currentUser } = useContext(AuthContext);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const onEmailSave = (e) => {
    console.log(e);
    makeRequest
      .put(`/users/update`, {
        email: e,
        name: currentUser.name,
        bio: currentUser.bio,
        username: currentUser.username,
      })
      .then()
      .catch((err) => setErr(err));
  };

  return (
    <div className="account">
      <SingleSettingComponent
        className={"item edit-user"}
        icon={faUserEdit}
        name={"User Information"}
        handleClick={() => navigate("/editProfile")}
      />
      <SingleSettingComponent
        className={"item change-email"}
        icon={faEnvelope}
        name={"Current Email"}
        input={"email"}
        defaultVal={currentUser.email}
        onInputSave={onEmailSave}
      />
      <SingleSettingComponent
        className={"item delete-account"}
        icon={faTrash}
        name={"Delete your account"}
        handleClick={() => {}}
      />
      {err && err}
    </div>
  );
}
