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

        <div className="logo2">
          <FontAwesomeIcon icon={faStaffSnake} className="imagen1" /> ¡Bienvenido a RenalVision!
        </div>

        <p>
          Adentrate a descubrir mas sobre tus riñones
        </p>

        <button onClick={handleClick} className="boton">
          Descubrelo
        </button>

      </div>

    </section>
  );
};

export default Home;
