import { NavLink } from "react-router";
import "./Header.css";

const Header = () => {
  return (
<header>
  <div className="container">
    {/* Logo a la izquierda */}
    <div className="logo">
      <img src="/src/assets/logo3.png" alt="Logo" />
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
