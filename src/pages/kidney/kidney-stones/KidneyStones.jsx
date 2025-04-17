
import { Outlet, useNavigate } from "react-router"
import "./KidneyStones.css"


import React, { useCallback } from 'react'

const KidneyStones = () => {

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate("/riñon/calculos-renales/que-es", {
    });
  }, [navigate]);

  return (
    <div>
        Calculos Renales
        <h1>Calculos Renales</h1>
        <p>Aqui va la informacion</p>
        <button onClick={handleClick}>Que Son los Calculos Renales</button>
        <Outlet/>
    </div>
  )
}

export default KidneyStones