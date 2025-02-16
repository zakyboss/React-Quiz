import React, { createContext, useContext, useEffect, useReducer } from "react";
const initialState = {
  questions: [],
  // 'loading' , 'error' , 'ready' , 'active' , 'finished'
  status: "loading",
  index: 0,
  answerIndex: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};
const SECS_PER_QUESTION = 30;
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "startGame":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const currQuestion = state.questions.at(state.index);
      return {
        ...state,
        answerIndex: action.payload,
        points:
          action.payload === currQuestion.correctOption
            ? state.points + currQuestion.points
            : state.points,
      };
    case "next":
      return { ...state, index: state.index + 1, answerIndex: null };
    case "finishedGame":
      return {
        ...state,
        status: "finished",
        index: state.index + 1,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
        secondsRemaining: null,
      };
    case "restartGame":
      return {
        ...state,
        status: "ready",
        index: 0,
        answerIndex: null,
        points: 0,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}
const QuizContext = createContext();

function QuizContextCreator({ children }) {
  const [
    {
      questions,
      status,
      index,
      answerIndex,
      points,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const totalPoints = questions.reduce((acc, curr) => acc + curr.points, 0);
  const numQuestions = questions.length;

  useEffect(function () {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        if (!res) {
          throw new Error("No response Got");
        }
        const data = await res.json();
        if (!data) {
          throw new Error("No data available");
        }
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }

    fetchQuestions();
  }, []);
  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answerIndex,
        points,
        highscore,
        secondsRemaining,
        dispatch,
        totalPoints,
        numQuestions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
function useQuizContext() {
  const context = useContext(QuizContext);

  return context;
}

export { useQuizContext, QuizContextCreator };
