import Cookies from "js-cookie";
import { createContext, useState } from "react";
import { makeRequest } from "../axios";
import { settingKeys } from "../utility/enums";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(Cookies.get("user") || null) || null
  );

  const settingsNeeded = [settingKeys.darkmmode.key];
  const login = async (inputs) =>
    makeRequest.post(`auth/login`, inputs).then((res) => {
      setCurrentUser(res.data);
      Cookies.set("user", JSON.stringify(res.data));
      let settingObj = {};
      settingsNeeded.forEach((set) => {
        makeRequest
          .get(`settings/get/${set}`)
          .then((res) => {
            settingObj[`${set}`] = res.data.value;
            Cookies.set("settings", JSON.stringify(settingObj));
          })
          .catch((err) => {
            console.error(err);
          });
      });
    });

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
