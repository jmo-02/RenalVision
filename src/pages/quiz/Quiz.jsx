import { useCallback } from "react";
import useQuizStore from "../../stores/use-quiz-store";
import Quiz3D from "./Quiz3D";
import "./Quiz.css";

const Quiz = () => {
  const { quiz, incrementQuizProgress } = useQuizStore();

  const handleQuizNext = useCallback(() => {
    incrementQuizProgress();
  }, [incrementQuizProgress]);
  
  return (
    <div className="quiz-3d-container">
      <Quiz3D />
    </div>
  );
};

export default Quiz;
