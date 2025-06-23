import { Link } from "react-router-dom";
import useAuthStore from "../../stores/use-auth-store";
import "./Footer.css";

const Footer = () => {
  const { userLooged } = useAuthStore();

  return (
    <footer>
      <nav aria-label="Mapa de navegación">
        <ul className="ulinks">
          <li><Link className="footer-link" to="/">Inicio</Link></li>
          <li><Link className="footer-link" to="/quiz">Quiz</Link></li>
          <li><Link className="footer-link" to="/ranking">Ranking</Link></li>
          <li>
            {userLooged ? (
              <Link className="footer-link" to="/perfil">Perfil</Link>
            ) : (
              <Link className="footer-link" to="/login">Iniciar Sesión</Link>
            )}
          </li>
          <li><Link className="footer-link" to="/sobre-nosotros">Sobre Nosotros</Link></li>
          <li>
            <span className="footer-link" tabIndex={0}>Enfermedades</span>
            <ul className="footer-submenu">
              <li><Link className="footer-link" to="/riñon/calculos-renales">Cálculos renales</Link></li>
              <li><Link className="footer-link" to="/riñon/glomerulonefritis">Glomerulonefritis</Link></li>
              <li><Link className="footer-link" to="/riñon/cancer-de-riñon">Cáncer de riñón</Link></li>
              <li><Link className="footer-link" to="/riñon/E-R-C">ERC</Link></li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className="footer-divider"></div>
      <p className="copyright-text">
        Copyright©2025. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;
