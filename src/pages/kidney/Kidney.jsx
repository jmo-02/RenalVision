import React, { useCallback } from 'react'
import { Outlet, useNavigate } from 'react-router'


const Kidney = () => {

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate("/riñon/calculos-renales", {
    });
  }, [navigate]);

  return (
    <div>
      Aqui encontraras algunas de las enfermedades renales mas comunes

      <button onClick={handleClick} className='boton1'>
        Calculos Renales
      </button>
      <Outlet/>
    </div>
  )
}

export default Kidney