import { useNavigate } from "react-router";
import "./Home.css";
import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStaffSnake } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate("/riñon", {
      state: { userData: { displayName: "Juan Moreno" } },
    });
  }, [navigate]);

  return (
    <section className="home">
      <div className="content">
        <div className="logo2 fade-in">
          <span className="logo-text">
            <FontAwesomeIcon icon={faStaffSnake} className="imagen1" />
            ¡Bienvenido a RenalVision!
          </span>
        </div >
        <p className="fade-in">Adentrate a descubrir más sobre tus riñones</p>
        <button onClick={handleClick} className="boton fade-in">
          Descúbrelo
        </button>
      </div>
    </section>
  );
};

export default Home;
