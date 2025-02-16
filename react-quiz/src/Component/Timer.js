import React, { useContext, useRef } from "react";
import { useEffect } from "react";
import { useQuizContext } from "./useQuizContext";
export default function Timer() {
  const { secondsRemaining, dispatch } = useQuizContext();
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => {
        clearInterval(id);
      };
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {" "}
      {mins < 10 ? `0${mins}` : mins}:{secs < 10 ? `0${secs}` : secs}
    </div>
  );
}
