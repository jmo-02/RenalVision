import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home/Home";
import Quiz from "./pages/quiz/Quiz";
<<<<<<< HEAD
import Login from "./pages/login/Login";
import NotFound from "./pages/not-found/NotFound";
import "./index.css";
import Layout from "./layout/Layout";
import KidneyCancer from "./pages/kidney/kidney-cancer/KidneyCancer";
import WhatIsCancer from "./pages/kidney/kidney-cancer/what-is-cancer/WhatIsCancer"; 
import KidneyStones from "./pages/kidney/kidney-stones/KidneyStones";
import KidneyDisease from "./pages/kidney/kidney-disease/KidneyDisease";
import WhatIsChronic from "./pages/kidney/kidney-disease/what-is-disease/WhatIsChronic";
import Kidney from "./pages/kidney/Kidney";
import Profile from "./pages/profile/Profile";
import WhatIs from "./pages/kidney/kidney-stones/what-is/WhatIs";
import AboutUs from "./pages/about-us/AboutUs";

=======
import NotFound from "./pages/not-found/NotFound";
import Heart from "./pages/heart/Heart";
import HighBloodPressure from "./pages/heart/high-blood-pressure/HighBloodPressure";
import LowBloodPressure from "./pages/heart/low-blood-pressure/LowBloodPressure";
import "./index.css";
import Layout from "./layout/Layout";
import KidneyStones from "./pages/Kidney/kidney-stones/KidneyStones";
import Kidney from "./pages/Kidney/Kidney";
>>>>>>> bf6fcf2ce86d3485ce60d02da551f0c26ec521a8
// import App from "./App";

createRoot(document.getElementById("root")).render(
  // <App />
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="quiz" element={<Quiz />} />
<<<<<<< HEAD
        <Route path="login" element={<Login />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="sobre-nosotros" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
        <Route path="riñon">
          <Route index element={<Kidney />} />

          <Route path="calculos-renales">
            <Route index element={<KidneyStones />} />
            <Route path="que-es" element={<WhatIs />} />
          </Route>
          
          <Route path="cancer-de-riñon">
            <Route index element={<KidneyCancer />} />
            <Route path="que-es-cancer" element={<WhatIsCancer />} />
        </Route>
          <Route path="E-R-C">
            <Route index element={<KidneyDisease />} />
            <Route path="que-es-erc" element={<WhatIsChronic />} />
          </Route>
=======
        <Route path="*" element={<NotFound />} />
        <Route path="riñon" element={<Kidney />}>
          <Route path="calculos-renales" element={<KidneyStones />} />
>>>>>>> bf6fcf2ce86d3485ce60d02da551f0c26ec521a8
        </Route>
      </Routes>
    </Layout>
  </BrowserRouter>
);
