//import Cookies from "cookies-js";
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
      .post(`/settings/add`, { name: name, value: value })
      .then((res) => {
        setSetting(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    Cookies.set("settings", JSON.stringify(setting));
  }, [setting]);

  return (
    <SettingContext.Provider value={{ setting, changeSetting }}>
      {children}
    </SettingContext.Provider>
  );
};
