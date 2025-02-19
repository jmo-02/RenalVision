import { Link } from "react-router";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <ul>
        <li>
          <Link to="/corazon/presion-alta">Presión alta</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
