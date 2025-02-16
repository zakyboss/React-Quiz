import React, { useContext } from "react";
import { useQuizContext } from "./QuizContext";
// import
export default function Progress() {
  const {
    index,
    numQuestions: numQuestions,
    points: points,
    totalPoints: totalPoints,
  } = useQuizContext();
  return (
    <div>
      <header className="progress">
        <progress max={numQuestions} value={index} />
        <p>
          Question{" "}
          <strong>
            {" "}
            {index + 1}/{numQuestions}
          </strong>
        </p>
        <p>
          <strong>
            {points}/{totalPoints}
          </strong>
        </p>
      </header>
    </div>
  );
}
