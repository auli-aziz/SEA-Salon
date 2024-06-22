import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar.tsx";
import Footer from "./components/Footer.tsx";
import Home from "./pages/Home.tsx";
import Services from "./pages/Services.tsx";
import { useState } from "react";

export default function App() {
  const [showNav, setShowNav] = useState(false);

  const handleNavbar = () => {
    if (window.scrollY >= 300) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  }

  window.addEventListener("scroll", handleNavbar);

  return (
    <div className="min-h-screen w-full bg-neutral-200">
      <NavBar isFixed={showNav} />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/services" element={<Services />} />
      </Routes>
      <Footer />
    </div>
  );
}
