import React, { useContext } from "react";
import { useQuizContext } from "./QuizContext";

export default function Finished() {
  const { points, totalPoints, highscore, dispatch } = useQuizContext();
  return (
    <div>
      <p className="result">
        <strong>
          You scored {points} out of {totalPoints} ({" "}
          <strong>{Math.round((points / totalPoints) * 100)}%)</strong>
        </strong>{" "}
      </p>
      <p className="highscore">Highscore : {highscore} points</p>

      <button
        className="btn btn ui"
        onClick={() => dispatch({ type: "restartGame" })}
      >
        Restart
      </button>
    </div>
  );
}
