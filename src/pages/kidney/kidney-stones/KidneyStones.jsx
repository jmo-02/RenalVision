import { Outlet, useNavigate } from "react-router"
import "./KidneyStones.css"

const KidneyStone = () => {
  const navigate = useNavigate();

  return (
    <div className="glomerulo-page">
      <div className="glomerulo-content">
        <div className="glomerulo-card">
          <h2> Calculos Renales</h2>
          <button onClick={() => navigate('/riñon/calculos-renales/que-es')}>¿Qué es?</button>
          <button onClick={() => navigate('/riñon/calculos-renales/sintomas')}>Síntomas</button>
          <button onClick={() => navigate('/riñon/calculos-renales/tratamientos')}>Tratamientos</button>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default KidneyStone;