"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const MyProvider = ({ children }) => {
  const [userName, setUserName] = useState({});
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    console.log(userName);
  }, [userName]);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!userName.length || !token) {
      const token = localStorage.getItem("auth-token");

      fetch(`http://localhost:5000/user/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Accept: "application/json",
          authorization: `${token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setUserName(result);
          console.log(result);
        });
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        userName,
        setUserName,
        showError,
        setShowError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
