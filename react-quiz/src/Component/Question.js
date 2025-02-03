import React from "react";
import Options from "./Options";
export default function Question({ question, dispatch, answerIndex }) {
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        dispatch={dispatch}
        answerIndex={answerIndex}
      />
    </div>
  );
}
