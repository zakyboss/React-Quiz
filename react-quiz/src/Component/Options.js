import React from "react";
import "../index.css";
import { useQuizContext } from "./QuizContext";
export default function Options({ question }) {
  const { dispatch, answerIndex } = useQuizContext();
  console.log(question.options);
  const hasAnswered = answerIndex !== null;
  return (
    <div className="options">
      {question.options.map((choice, i) => (
        <button
          className={`btn btn-option ${i === answerIndex ? "answer" : ""} ${
            hasAnswered
              ? i === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          onClick={() => dispatch({ type: "newAnswer", payload: i })}
          disabled={hasAnswered}
          key={choice}
        >
          {" "}
          {choice}
        </button>
      ))}
    </div>
  );
}
