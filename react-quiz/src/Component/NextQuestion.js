import React from "react";
export default function NextQuestion({ dispatch, answerIndex, index }) {
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
