import React from "react";
export default function NextQuestion({ dispatch, answerIndex }) {
  return (
    <div>
      {answerIndex ? (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "next" })}
        >
          Next
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
