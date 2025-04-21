import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return <div>¡¡¡ NOT FOUND !!!</div>;
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p>Lo sentimos, la página que estás buscando no existe o fue movida.</p>
      <button onClick={() => navigate('/')}>Volver al inicio</button>
    </div>
  );
};

export default NotFound;
