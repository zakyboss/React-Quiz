import React from "react";

export default function Progress({ index, numQuestions, points, totalPoints }) {
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
