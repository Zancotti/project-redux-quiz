import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { quiz } from "../reducers/quiz";
import { StartScreen } from "screens/StartScreen";
import { SummaryScreen } from "screens/SummaryScreen";
import { QuestionScreen } from "screens/QuestionScreen";

// In the main we steer the user to the summaryScreen, to the startScreen or the questionScreen
// depending if the quiz is over or if the user has pressed the start button or not.
export const Main = () => {
  const [startButtonClick, setStartButtonClick] = useState(false);
  const isQuizOver = useSelector((state) => state.quiz.quizOver);
  const dispatch = useDispatch();

  const onRestart = () => {
    setStartButtonClick(false);
    dispatch(quiz.actions.restart());
  };

  if (isQuizOver) {
    return <SummaryScreen onRestartClicked={onRestart} />;
  }

  if (!startButtonClick) {
    return (
      <StartScreen onStartButtonClick={(value) => setStartButtonClick(value)} />
    );
  }
  if (startButtonClick) {
    return <QuestionScreen />;
  }
};
