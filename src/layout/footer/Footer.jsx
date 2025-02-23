import { Link } from "react-router";
import "./Footer.css";

const Footer = () => {
  return (
  <footer>
    <ul className="ulinks">
      <li><Link to="/riñon/calculos-renales" className="footer-link">Cálculos Renales</Link></li>
      <li><Link to="/riñon/Cancer-Riñon" className="footer-link">Cancer Riñon</Link></li>
      <li><Link to="/riñon/enfermedad-renal-cronica" className="footer-link">Enfermedad Renal Cronica</Link></li>
      <li><Link to="/riñon/glomerulonefritis" className="footer-link">Glomerulonefritis</Link></li>
    </ul>
    <p className="copyright-text">Copyright 2025</p>
  </footer>
  );
};

export default Footer;
