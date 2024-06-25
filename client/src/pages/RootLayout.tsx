import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar.tsx";
import Footer from "../components/Footer.tsx";

export default function RootLayout() {
  const [showNav, setShowNav] = useState(false);

  const handleNavbar = () => {
    if (window.scrollY >= 300) {
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
