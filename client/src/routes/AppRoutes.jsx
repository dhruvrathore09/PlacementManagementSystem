import { Routes, Route } from "react-router-dom";

import Home from "../pages/student/Home";

import Features from "../pages/Features";
import About from "../pages/About";
import Contact from "../pages/Contact";


const AppRoutes = () => {

  return (

    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/features" element={<Features />} />

      <Route path="/about" element={<About />} />

      <Route path="/contact" element={<Contact />} />


    </Routes>

  )

}


export default AppRoutes;