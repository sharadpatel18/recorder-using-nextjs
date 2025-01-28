"use client";

import { createContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";

export const MyContext = createContext();

export const MyContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [isUser , setIsUser] = useState(false);
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
    <MyContext.Provider value={{ user , isUser:setIsUser  , logout }}>
      {props.children}
    </MyContext.Provider>
  );
};
