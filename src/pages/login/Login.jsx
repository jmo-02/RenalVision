import React, { useCallback } from "react";
import { useNavigate } from "react-router";
import "./Login.css";
import useAuthStore from "../../stores/use-auth-store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStaffSnake } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const { loginGoogleWithPopUp } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    loginGoogleWithPopUp()
      .then(() => navigate("/perfil"))
      .catch(() => navigate("/"));
  }, [loginGoogleWithPopUp, navigate]);

  return (
    <div className="login-container">

      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo" style={{ fontSize: 50 }}>
              <FontAwesomeIcon icon={faStaffSnake} className="login-logo-icon" />
            </div>
            <div className="login-title-section">
              <h1 className="login-title">
                <span className="login-title-accent">Renal</span>Vision
              </h1>
              <p className="login-subtitle">
                Donde descubriras sobre de enfermedades renales
              </p>
            </div>
          </div>

          <div className="login-welcome">
            <h2 className="login-welcome-title">
              Bienvenido a RenalVision
            </h2>
            <p className="login-welcome-text">
              Inicia sesión para acceder a tu cuenta
            </p>
          </div>

          <div className="login-form">
            <button
              type="button"
              title="Iniciar sesión con Google"
              onClick={handleLogin}
              className="login-google-btn"
            >
              <svg className="login-google-icon" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="login-google-text">
                Continuar con Google
              </span>
            </button>
          </div>

          <div className="login-info">
            <p className="login-privacy">
              Al continuar, aceptas nuestros términos de servicio<br/> y política de privacidad
            </p>
          </div>
        </div>

        <div className="login-footer">
          <div className="login-features">
            <div className="login-feature">
              <div className="login-feature-dot login-feature-dot-1"></div>
              <span>Monitoreo</span>
            </div>
            <div className="login-feature">
              <div className="login-feature-dot login-feature-dot-2"></div>
              <span>Diagnóstico</span>
            </div>
            <div className="login-feature">
              <div className="login-feature-dot login-feature-dot-3"></div>
              <span>Tratamiento</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;