import axios from "axios";
//import Cookies from "cookies-js";
import Cookies from "js-cookie";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    //JSON.parse(localStorage.getItem("user")) || null
    JSON.parse(Cookies.get("user") || null) || null
  );

  const login = async (inputs) => {
    const res = await axios.post(
      "http://localhost:8080/api/auth/login",
      inputs,
      {
        withCredentials: true,
      }
    );

    setCurrentUser(res.data);
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
