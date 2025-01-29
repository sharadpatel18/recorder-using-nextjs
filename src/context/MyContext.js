"use client";

import { createContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";

export const MyContext = createContext();

export const MyContextProvider = (props) => {
  const getUserData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt.decode(token);
      return decodedToken;
    } else {
      return null;
    }
  };
  const [user, setUser] = useState(getUserData);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt.decode(token);
      setUser(decodedToken);
    }
  }, [isUser]);

  const logout = () => {
    setUser(null);
  };

  return (
    <MyContext.Provider value={{ user, isUser: setIsUser, logout }}>
      {props.children}
    </MyContext.Provider>
  );
};
