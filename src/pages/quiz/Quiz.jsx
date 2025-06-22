import { useState } from "react";
import Quiz3D from "./Quiz3D";
import { useNavigate } from "react-router";

const Quiz = () => {
  const [showQuiz3D, setShowQuiz3D] = useState(false);
  const navigate = useNavigate();

  if (showQuiz3D) return <Quiz3D onBack={() => setShowQuiz3D(false)} />;

  return (
    <div>
      <button onClick={() => setShowQuiz3D(true)}>
        Iniciar Quiz 3D
      </button>
      <button onClick={() => navigate("/ranking")}>
        Ver ranking
      </button>
      <button onClick={() => navigate("/")}>
        Volver al inicio
      </button>
    </div>
  );
};

export default Quiz;