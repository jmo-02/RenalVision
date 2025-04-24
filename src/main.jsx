import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home/Home";
import Quiz from "./pages/quiz/Quiz";
import Login from "./pages/login/Login";
import NotFound from "./pages/not-found/NotFound";
import "./index.css";
import Layout from "./layout/Layout";
import KidneyCancer from "./pages/kidney/kidney-cancer/KidneyCancer";
import WhatIsCancer from "./pages/kidney/kidney-cancer/what-is-cancer/WhatIsCancer"; 
import KidneyStones from "./pages/kidney/kidney-stones/KidneyStones";
import Kidney from "./pages/kidney/Kidney";
import Profile from "./pages/profile/Profile";
import WhatIs from "./pages/kidney/kidney-stones/what-is/WhatIs";
import AboutUs from "./pages/about-us/AboutUs";
import KidneyStoneTreatment from "./pages/kidney/kidney-stones/treatment/KidneyStoneTreatment";
import KidneyStoneSymptoms from "./pages/kidney/kidney-stones/symptoms/KidneyStoneSymptoms";

// import App from "./App";
import Glomerulonephritis from "./pages/kidney/glomerulonephritis/Glomerulonephritis";
import GlomerulonephritisWhatIs from "./pages/kidney/glomerulonephritis/what-is/GlomerulonephritisWhatIs";
import GlomerulonephritisSymptoms from "./pages/kidney/glomerulonephritis/symptoms/GlomerulonephritisSymptoms";
import GlomerulonephritisTreatment from "./pages/kidney/glomerulonephritis/treatment/GlomerulonephritisTreatment";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="login" element={<Login />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="sobre-nosotros" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
        <Route path="riñon">
          <Route index element={<Kidney />} />
          <Route path="calculos-renales" element={<KidneyStones />} />
          
          <Route path="glomerulonefritis" >
            <Route index element={<Glomerulonephritis />} />
            <Route path="info" element={<GlomerulonephritisWhatIs />} />
            <Route path="sintomas" element={<GlomerulonephritisSymptoms />} />
            <Route path="tratamientos" element={<GlomerulonephritisTreatment />} />
          </Route>
          <Route path="cancer-de-riñon">
          <Route index element={<KidneyCancer />} />
          <Route path="que-es-cancer" element={<WhatIsCancer />} />
        </Route>
        </Route>
      </Routes>
    </Layout>
  </BrowserRouter>
);
