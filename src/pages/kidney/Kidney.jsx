import React, { useCallback } from "react";
import { Outlet, useNavigate } from "react-router";

const Kidney = () => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate("/riñon/calculos-renales", {});
  }, [navigate]);

  const handleClickCancer = useCallback(() => {
    navigate("/riñon/cancer-de-riñon", {});
  }, [navigate]);

  const handleClickChronic = useCallback(() => {
    navigate("/riñon/E-R-C", {});
  }, [navigate]);

  return (
    <div>
      Aqui encontraras algunas de las enfermedades renales mas comunes
      <button onClick={handleClick} className="boton1">
        Calculos Renales
      </button>
      <br />
      <button onClick={handleClickCancer} className="boton2">
        Cancer de Riñon
      </button>
      <br />
      <button onClick={handleClickChronic} className="boton3">
        Enfermedad Renal Cronica
      </button>
      <Outlet />
    </div>
  );
};

export default Kidney;
