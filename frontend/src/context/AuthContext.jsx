import axios from "axios";
//import Cookies from "cookies-js";
import Cookies from "js-cookie";

import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../axios";
import { settingKeys } from "../utility/enums";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    //JSON.parse(localStorage.getItem("user")) || null
    JSON.parse(Cookies.get("user") || null) || null
  );

  const settingsNeeded = [settingKeys.darkmode];
  const login = async (inputs) => {
    makeRequest
      .post(`auth/login`, inputs)
      .then((res) => setCurrentUser(res.data))
      .catch((err) => console.error(err));

    makeRequest
      .get(
        `settings/getall?names=[${settingsNeeded
          .map((s) => `"${s}"`)
          .toString()}]`
      )
      .then((res) => {
        Cookies.set("settings", JSON.stringify(res.data));
      })
      .catch((err) => console.error(err));

    //setCurrentUser(usr.data);
  };

  useEffect(() => {
    //localStorage.setItem("user", JSON.stringify(currentUser));
    Cookies.set("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
