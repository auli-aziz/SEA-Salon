import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../sections/NavBar.tsx";
import Footer from "../sections/Footer.tsx";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout() {
  const [showNav, setShowNav] = useState(false);

  const handleNavbar = () => {
    if (window.scrollY >= 260) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  };
  window.addEventListener("scroll", handleNavbar);

  return (
    <div className="min-h-screen h-fit w-full bg-neutral-200">
      <NavBar isFixed={showNav} />
      <Outlet />
      <Footer />
    </div>
  );
}
