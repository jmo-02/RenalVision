import { useCallback } from 'react';
import useAuthStore from '../../stores/use-auth-store';
import { useNavigate } from 'react-router';


const Profile = () => {
  const{ userLooged, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = useCallback(() =>{
    logout().then(() => navigate("/"));

  }, [logout, navigate]);

  return (
    <>
        <h2>Perfil de Usuario</h2>
        <p>!Bienvenido! {userLooged?.displayName}</p>
        <button onClick={handleLogout} tittle="Cerrar Sesion" type="submit" className="login-button">
          Cerrar Sesión
        </button>
    </>
  );
};


export default Profile