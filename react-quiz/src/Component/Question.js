import React from "react";
import Options from "./Options";
import { useQuizContext } from "./useQuizContext";
export default function Question() {
  const { questions, index } = useQuizContext();
  if (!questions.length || !questions[index]) return null;

  return (
    <div>
      <h4>{questions[index].question}</h4>

      {/* Render only the options for the current question */}
      <Options question={questions[index]} />
    </div>
  );
}
