import { NavLink, Link } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStaffSnake } from "@fortawesome/free-solid-svg-icons";
import useAuthStore from "../../stores/use-auth-store";

const Header = () => {
  const { userLooged } = useAuthStore();
  

  return (
    <header>
      <div className="container">
        {/* Logo y texto ahora son un Link */}
        <Link to="/" className="logo-container" style={{ textDecoration: "none" }}>
          <div className="logo" style={{ fontSize: 90 }}>
            <FontAwesomeIcon icon={faStaffSnake} />
          </div>
          <span className="logo-text">RenalVision</span>
        </Link>

        {/* Navegación */}
        <nav className="navlinks">
          <NavLink to="/" end className="link">
            Inicio
          </NavLink>

        {/* Desplegable con hover */}
        <div className="dropdown">
            <div className="link">Enfermedades</div>
            <div className="dropdown-menu">
              <NavLink to="/riñon/calculos-renales" className="dropdown-item">Calculos Renales</NavLink>
              <NavLink to="/riñon/cancer-de-riñon" className="dropdown-item">Cáncer de Riñon</NavLink>
              <NavLink to="/riñon/glomerulonefritis" className="dropdown-item">Glomerulonefritis</NavLink>
              <NavLink to="/riñon/E-R-C" className="dropdown-item">Enfermedad Cronica</NavLink>
            </div>
          </div>

         {/*  <NavLink to="/riñon" end className="link">
            Enfermedades
          </NavLink>
 */}

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
