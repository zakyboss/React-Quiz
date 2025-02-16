// import React, { useContext } from "react";
import { useQuizContext } from "./useQuizContext";
export default function NextQuestion() {
  const { dispatch, answerIndex, index } = useQuizContext();
  return (
    <div>
      {answerIndex !== null && index !== 14 && index !== 15 ? (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "next" })}
        >
          Next
        </button>
      ) : (
        ""
      )}

      {index === 14 && 15 ? (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finishedGame" })}
        >
          Finish{" "}
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
