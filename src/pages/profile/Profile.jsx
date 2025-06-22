import { useCallback, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/use-auth-store";
import "./Profile.css";

const Profile = () => {
  const { userLooged, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout().then(() => navigate("/"));
  }, [logout, navigate]);

  useEffect(() => {
    if (!userLooged) return;
    const fetchData = async () => {
      const { displayName, email } = userLooged;
      const data = { displayName, email };
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}users`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );
        if (!response.ok)
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        return await response.json();
      } catch (error) {
        console.error(`Error creating user:`, error);
        throw error;
      }
    };
    fetchData();
  }, [userLooged]);

  if (!userLooged) return <Navigate to="/login" />;

  return (
    <div className="profile-container">
      <div className="profile-title">¡BIENVENIDO A TU PERFIL DE USUARIO!</div>
      <div className="profile-info">
        <div className="profile-row">
          <span className="profile-label">Nombre:</span>
          <span className="profile-value">{userLooged?.displayName}</span>
        </div>
        <div className="profile-row">
          <span className="profile-label">Correo:</span>
          <span className="profile-value">{userLooged?.email}</span>
        </div>
      </div>
      <button
        className="profile-logout-btn"
        onClick={handleLogout}
        title="Cerrar sesión"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Profile;