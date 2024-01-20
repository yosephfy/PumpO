import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../axios";
import { apiCalls, settingKeys } from "../utility/enums";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(Cookies.get("user") || null) || null
  );

  const [settings, setSettings] = useState(
    JSON.parse(Cookies.get("settings") || null) || null
  );

  useEffect(() => {
    applyDarkMode(settings);
  }, [settings]);

  const applyDarkMode = (obj) => {
    if (!settings) return;

    if (obj.darkmode == 1) {
      document.querySelector("body").classList.add("darkmode");
    } else {
      document.querySelector("body").classList.remove("darkmode");
    }
  };

  const settingsNeeded = [settingKeys.darkmmode.key];

  const login = async (inputs) =>
    makeRequest.post(apiCalls().auth.add.login, inputs).then((res) => {
      setCurrentUser(res.data);
      Cookies.set("user", JSON.stringify(res.data));
      let settingObj = {};
      settingsNeeded.forEach((set) => {
        makeRequest
          .get(apiCalls(set).setting.get.withKey)
          .then((res2) => {
            settingObj[`${set}`] = res2.data.value;
            setSettings(settingObj);
            Cookies.set("settings", JSON.stringify(settingObj));
            applyDarkMode(settingObj);
          })
          .catch((err) => {
            console.error(err.response.data);
          });
      });
    });

  const changeSettings = ({ name, value }) => {
    makeRequest
      .put(apiCalls().setting.update.setting, { name, value })
      .then((res) => {
        Cookies.set("settings", JSON.stringify({ [`${name}`]: value }));
        setSettings(JSON.parse(Cookies.get("settings")));
      })
      .catch((err) => console.log(err));
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, settings, login, changeSettings }}
    >
      {children}
    </AuthContext.Provider>
  );
};
