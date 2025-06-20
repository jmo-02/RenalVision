import "./Login.css";
import useAuthStore from "../../stores/use-auth-store";
import { useNavigate } from "react-router";
import { useCallback } from "react";

const Login = () => {
  const { loginGoogleWithPopUp } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    loginGoogleWithPopUp()
      .then(() => navigate("/perfil"))
      .catch(() => navigate("/"));
  }, [loginGoogleWithPopUp, navigate]);

  return (
    <>
      <h2>Continua con Google</h2>
      <button
        type="button"
        title="Iniciar sesíón con Google"
        onClick={handleLogin}
      >
        Iniciar sesión
      </button>
    </>
  );
};

export default Login;