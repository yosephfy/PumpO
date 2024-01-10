import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../axios";

export const SettingContext = createContext();

export const SettingContextProvider = ({ children }) => {
  const [setting, setSetting] = useState(
    JSON.parse(Cookies.get("settings") || null) || null
  );

  const changeSetting = ({ name, value }) => {
    makeRequest
      .post(`/settings/update`, { name: name, value: value })
      .then((res) => {
        setSetting((prev) => (prev[`${name}`] = value));
        Cookies.set("settings", JSON.stringify(setting));
      })
      .catch((err) => console.error(err));
  };

  return (
    <SettingContext.Provider value={{ setting, changeSetting }}>
      {children}
    </SettingContext.Provider>
  );
};
