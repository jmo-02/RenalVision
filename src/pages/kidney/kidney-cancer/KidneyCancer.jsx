
import { Outlet, useNavigate } from "react-router"
import "./KidneyCancer.css"


import React, { useCallback } from 'react'

const KidneyCancer = () => {

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate("/riñon/cancer-de-riñon/que-es-cancer", {
    });
  }, [navigate]);

  return (
    <div>
        Cancer de Riñon
        <h1>Cancer de Riñon</h1>
        <p>Aqui va la informacion</p>
        <button onClick={handleClick}>Que es el cancer de riñon</button>
        <Outlet/>
    </div>
  )
}

export default KidneyCancer;