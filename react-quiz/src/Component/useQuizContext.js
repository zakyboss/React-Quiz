import React, { useContext } from "react";
import { QuizContext } from "./App";
export function useQuizContext() {
  const context = useContext(QuizContext);

  return context;
}
