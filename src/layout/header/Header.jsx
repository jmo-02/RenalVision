import { NavLink } from "react-router";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStaffSnake } from "@fortawesome/free-solid-svg-icons";
import useAuthStore from "../../stores/use-auth-store";

const Header = () => {
  const { userLooged } = useAuthStore();

  return (
    <header>
      <div className="container">
        <div className="logo-container">
          <div className="logo" style={{ fontSize: 90 }}>
            <FontAwesomeIcon icon={faStaffSnake} />
          </div>
          <span className="logo-text">RenalVision</span>
        </div>

        {/* Navegación */}
        <nav className="navlinks">
          <NavLink to="/" end className="link">
            Inicio
          </NavLink>

          <NavLink to="/riñon" end className="link">
            Enfermedades
          </NavLink>

          {userLooged && (
            <NavLink to="/quiz" end className="link">
              Quiz
            </NavLink>
          )}

          <NavLink to="/sobre-nosotros" end className="link">
            Sobre Nosotros
          </NavLink>

          {userLooged ? (
            <NavLink to="/perfil" end className="link">
              Perfil
            </NavLink>
          ) : (
            <NavLink to="/login" end className="link">
              Iniciar Sesión
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
