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
    <div className="imageContainer">
      <h1>RenalVision</h1>
      
      <div className="logo2" style={{fontSize:200}}>

      {/* <img src="/images/logo3.png" className="imagen1" />
       */}
      <FontAwesomeIcon icon={faStaffSnake} className="imagen1"/>

      </div>
      
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
