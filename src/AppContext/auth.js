import React, { createContext, useState } from "react";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [userImg, setUserImg] = useState("");
  const [percentageDone, setPercentageDone] = useState("");

  function saveToken(token) {
    setToken(token);
  }
  function saveImg(img) {
    setUserImg(img);
  }
  function calcPercentageDone(concludesHabits, todaysHabits) {
    if (!concludesHabits) {
      setPercentageDone("zero");
    } else {
      setPercentageDone(
        ((concludesHabits.length * 100) / todaysHabits.length).toFixed(0)
      );
      return ((concludesHabits.length * 100) / todaysHabits.length).toFixed(0);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        saveToken,
        userImg,
        saveImg,
        percentageDone,
        calcPercentageDone,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
