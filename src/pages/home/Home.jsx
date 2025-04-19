import { useNavigate } from "react-router";
import "./Home.css";
import { useCallback } from "react";
<<<<<<< HEAD
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStaffSnake } from "@fortawesome/free-solid-svg-icons";
=======
>>>>>>> bf6fcf2ce86d3485ce60d02da551f0c26ec521a8

const Home = () => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate("/riñon", {
      state: { userData: { displayName: "Juan Moreno" } },
    });
  }, [navigate]);

  return (
<<<<<<< HEAD
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
=======
  <section className="home">
    <div className="imageContainer">
      <h1>RenalVision</h1>
      <img src="src/assets/logo3.png" className="imagen1" />
      <button onClick={handleClick} className="boton3">Ver más enfermedades</button>
    </div>

    <div className="content">
      <h3>Acerca de nosotros</h3>
      <p>
        En este texto va a ir información del proyecto....  
        Renal Vision es un ......  
        .....
      </p>
    </div>
  </section>
>>>>>>> bf6fcf2ce86d3485ce60d02da551f0c26ec521a8
  );
};

export default Home;
