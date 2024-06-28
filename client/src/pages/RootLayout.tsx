import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../sections/NavBar.tsx";
import Footer from "../sections/Footer.tsx";
import { NavbarContext } from "../contexts/navbar.tsx";

export default function RootLayout() {
  const location = useLocation();
  const path = location.pathname;
  const [isFixed, setIsFixed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleMobileNavButton = () => {
    setIsOpen((curr) => !curr);
  }

  const handleNavbar = () => {
    if (window.scrollY >= 260) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };
  window.addEventListener("scroll", handleNavbar);

  return (
    <div className="min-h-screen h-fit w-full bg-neutral-200">
      <NavbarContext.Provider value={{path, isFixed, isOpen, handleMobileNavButton}}>
        <NavBar />
      </NavbarContext.Provider>
      <Outlet />
      <Footer />
    </div>
  );
}
