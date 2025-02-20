import { NavLink } from "react-router";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStaffSnake } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
<header>
  <div className="container">
    {/* Logo a la izquierda */}
    <div className="logo" style={{fontSize:90}}>
      <FontAwesomeIcon icon={faStaffSnake} />
    </div>

    {/* Navegación */}
    <nav className="navlinks">
      <NavLink to="/" end className="link">
        Inicio
      </NavLink>
      <NavLink to="/quiz" end className="link">
        Quiz
      </NavLink>
      <NavLink to="/sobre-nosotros" end className="link">
        Sobre Nosotros
      </NavLink>
    </nav>
  </div>
</header>

  );
};

export default Header;
