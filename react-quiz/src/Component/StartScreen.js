import { useQuizContext } from "./QuizContext";

// import React, { useCallback, useContext } from "react";
export default function StartScreen() {
  const { numQuestions, dispatch } = useQuizContext();
  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h3> {numQuestions} Question to Test Your React understanding</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "startGame" })}
      >
        Let's Start
      </button>
    </div>
  );
}
