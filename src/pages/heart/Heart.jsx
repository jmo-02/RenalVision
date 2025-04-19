import { Outlet, useLocation } from "react-router";
import "./Heart.css";

const Heart = () => {
  const location = useLocation();
  const userData = location.state?.userData;

  return (
    <div>
      <h1>Enfermedades del Corazón</h1>
      <p>{userData?.displayName}</p>
      <Outlet />
    </div>
  );
};

export default Heart;
