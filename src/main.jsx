import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home/Home";
import Quiz from "./pages/quiz/Quiz";
import Login from "./pages/login/Login";
import NotFound from "./pages/not-found/NotFound";
import "./index.css";
import Layout from "./layout/Layout";
import KidneyStones from "./pages/kidney/kidney-stones/KidneyStones";
import Kidney from "./pages/kidney/Kidney";
import Profile from "./pages/profile/Profile";
import WhatIs from "./pages/kidney/kidney-stones/what-is/WhatIs";
import AboutUs from "./pages/about-us/AboutUs";
import Glomerulonephritis from "./pages/kidney/glomerulonephritis/Glomerulonephritis";
import GlomerulonephritisWhatIs from "./pages/kidney/glomerulonephritis/what-is/GlomerulonephritisWhatIs";

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
          <Route path="calculos-renales">
            <Route index element={<KidneyStones />} />
            <Route path="que-es" element={<WhatIs />} />
          </Route>
          <Route path="glomerulonefritis">
            <Route index element={<Glomerulonephritis />} />
            <Route path="info" element={<GlomerulonephritisWhatIs />} />
          </Route>
        </Route>
      </Routes>
    </Layout>
  </BrowserRouter>
);
