// import { createContext, useEffect, useReducer } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import StartScreen from "./StartScreen.js";
import Question from "./Question.js";
import NextQuestion from "./NextQuestion.js";
import Progress from "./Progress.js";
import Finished from "./FInished.js";
import Footer from "./Footer.js";
import Timer from "./Timer.js";
import { QuizContextCreator, useQuizContext } from "./QuizContext.jsx";

function App() {
  const { status, questions, dispatch, answerIndex, index } = useQuizContext();
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answerIndex={answerIndex}
            />
          </>
        )}
        <Footer>
          <NextQuestion />

          {status === "finished" && <Finished />}
          {status === "active" ? <Timer /> : ""}
        </Footer>
      </Main>
    </div>
  );
}

export default App;
