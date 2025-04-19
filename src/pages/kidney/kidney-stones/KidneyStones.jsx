<<<<<<< HEAD

import { Outlet, useNavigate } from "react-router"
import "./KidneyStones.css"


import React, { useCallback } from 'react'

const KidneyStones = () => {

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate("/riñon/calculos-renales/que-es", {
    });
  }, [navigate]);

=======
import "./KidneyStones.css"

import React from 'react'

const KidneyStones = () => {
>>>>>>> bf6fcf2ce86d3485ce60d02da551f0c26ec521a8
  return (
    <div>
        Calculos Renales
        <h1>Calculos Renales</h1>
        <p>Aqui va la informacion</p>
<<<<<<< HEAD
        <button onClick={handleClick}>Que Son los Calculos Renales</button>
        <Outlet/>
=======
>>>>>>> bf6fcf2ce86d3485ce60d02da551f0c26ec521a8
    </div>
  )
}

export default KidneyStones