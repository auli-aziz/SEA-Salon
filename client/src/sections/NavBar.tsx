import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { NavbarContext } from "../contexts/navbar";
import MobileNavButton from "./MobileNavButton";
import NavList from "./NavList";

export default function NavBar() {
  const { path, isFixed } = useContext(NavbarContext);

  return (
    <div
      className={`w-full h-fit px-8 flex items-center justify-between py-5 z-20 ${
        (isFixed || path !== "/") ? "bg-white fixed top-0 shadow-lg" : "absolute bg-transparent"
      }`}
    >
      <h3 className="font-heading text-4xl md:text-5xl font-bold text-red-800">
        <Link to="/">SEA Salon</Link>
      </h3>
      <NavList />
      <MobileNavButton />
    </div>
  );
}
