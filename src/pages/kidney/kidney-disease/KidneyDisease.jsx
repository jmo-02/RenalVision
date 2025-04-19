
import { Outlet, useNavigate } from "react-router"
import "./KidneyDisease.css"


import React, { useCallback } from 'react'

const KidneyDisease= () => {

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate("/riñon/E-R-C/que-es-erc", {
    });
  }, [navigate]);

  return (
    <div>
      Enfermedad Renal Crónica
      <h1>Enfermedad Renal Crónica</h1>
      <p>Aqui va la informacion</p>
      <button onClick={handleClick}>Que es la enfermedad renal crónica</button>
      <Outlet/>
    </div>
  )
}

export default KidneyDisease;