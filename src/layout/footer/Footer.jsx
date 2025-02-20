import { Link } from "react-router";
import "./Footer.css";

const Footer = () => {
  return (
  <footer>
    <ul className="ulinks">
      <li><Link to="/riñon/calculos-renales" className="footer-link">Cálculos Renales</Link></li>
      <li><Link to="/riñon/enfermedad-2" className="footer-link">Enfermedad 2</Link></li>
      <li><Link to="/riñon/enfermedad-3" className="footer-link">Enfermedad 3</Link></li>
      <li><Link to="/riñon/enfermedad-4" className="footer-link">Enfermedad 4</Link></li>
    </ul>
  </footer>
  );
};

export default Footer;
