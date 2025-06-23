import { useState, useEffect } from "react";
import Quiz3D from "./Quiz3D";
import "./Quiz.css"; // Assuming you have a CSS file for styling
import { useNavigate, useLocation, Navigate } from "react-router-dom"; // Asegúrate de importar correctamente tu store de autenticación
import useAuthStore from "../../stores/use-auth-store";

const Quiz = () => {
  const [showQuiz3D, setShowQuiz3D] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { userLooged } = useAuthStore();

  useEffect(() => {
    if (location.state?.fromQuiz) {
      alert("Debes iniciar sesión para acceder al Quiz.");
    }
  }, [location.state]);

  if (!userLooged) return <Navigate to="/login" state={{ fromQuiz: true }} />;
  if (showQuiz3D) return <Quiz3D onBack={() => setShowQuiz3D(false)} />;

  return (
    <div className="quiz-container-1">
      <div className="quiz-info">
        <h2>Bienvenido al Quiz RenalVision</h2>
        <p>
          Aquí podrás poner a prueba tus conocimientos sobre salud renal.
          <br />
          Selecciona una opción para comenzar, ver el ranking o volver al
          inicio.
        </p>
      </div>
      <button onClick={() => setShowQuiz3D(true)}>Iniciar Quiz</button>
      <button onClick={() => navigate("/ranking")}>Ver ranking</button>
      <button onClick={() => navigate("/")}>Volver al inicio</button>
    </div>
  );
};

export default Quiz;
