import { useEffect, useReducer } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import StartScreen from "./StartScreen.js";
import Question from "./Question.js";
import NextQuestion from "./NextQuestion.js";
const initialState = {
  questions: [],
  // 'loading' , 'error' , 'ready' , 'active' , 'finished'
  status: "loading",
  index: 0,
  answerIndex: null,
  points: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "startGame":
      return { ...state, status: "active" };
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
    default:
      throw new Error("Action unknown");
  }
}
function App() {
  const [{ questions, status, index, answerIndex }, dispatch] = useReducer(
    reducer,
    initialState
  );
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
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answerIndex={answerIndex}
          />
        )}
         <NextQuestion dispatch={dispatch} answerIndex={answerIndex} />
      </Main>
    </div>
  );
}

export default App;
