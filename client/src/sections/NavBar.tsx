import { useState } from "react";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { FiAlignJustify, FiX } from "react-icons/fi";
import ServicesContent from "../components/ServicesContent";
import FlyoutLink from "../components/FlyoutLink";
import LogoutButton from "../components/LogoutButton";

export default function NavBar({ isFixed }: { isFixed: boolean }) {
  const token = useRouteLoaderData("root") as string | null;
  const role = localStorage.getItem("role");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`w-full h-fit px-16 flex items-center justify-between py-5 bg-gray-100 z-20 shadow-lg ${
        isFixed ? "fixed" : "static"
      }`}
    >
      <h3 className="font-heading text-4xl md:text-5xl font-bold text-red-800">
        <a href="/">SEA Salon</a>
      </h3>
      <nav
        className={`h-fit md:h-full w-[96%] md:w-fit md:flex items-center absolute md:static md:bg-gray-100 bg-red-900 md:py-0 py-5 md:shadow-none shadow-2xl z-20 ${
          isOpen ? "top-[75px] left-2" : "top-[-250px] left-2"
        }`}
      >
        <FlyoutLink href="/" FlyoutContent={null}>
          Home
        </FlyoutLink>
        {token && (
          <FlyoutLink href={role === "admin"? "/admin":"/dashboard"} FlyoutContent={null}>
            Dashboard
          </FlyoutLink>
        )}
        <FlyoutLink href="/services" FlyoutContent={ServicesContent}>
          About Us
        </FlyoutLink>
        <a
          href="/#contacts"
          className="relative pl-5 pb-2 md:py-0 text-gray-200 md:text-gray-900 md:hover:text-red-900 hover:text-red-200 font-bold text-xl font-economica"
        >
          Contact
        </a>
        {!token ? (
          <button
            onClick={() => navigate("/auth?mode=login")}
            className="w-fit rounded-lg border-2 md:border-black ml-5 md:ml-10 px-8 py-1 text-gray-200 md:text-gray-900 font-bold text-xl font-economica transition-colors hover:bg-gray-900 hover:text-white hover:border-black"
          >
            Log In
          </button>
        ) : (
          <LogoutButton isMobile={true} />
        )}
      </nav>
      <div
        className="absolute top-7 right-14 md:hidden text-2xl dark:text-gray-200"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? (
          <FiX className="text-gray-800" />
        ) : (
          <FiAlignJustify className="text-gray-800" />
        )}
      </div>
    </div>
  );
}
