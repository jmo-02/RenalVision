import { useNavigate } from "react-router";
import "./Home.css";
import { useCallback } from "react";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate("/riñon", {
      state: { userData: { displayName: "Juan Moreno" } },
    });
  }, [navigate]);

  return (
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
  );
};

export default Home;
