import { useState } from "react";
import { FiAlignJustify, FiX } from "react-icons/fi";
import ServicesContent from "../components/ServicesContent";
import FlyoutLink from "../components/FlyoutLink";

export default function NavBar({ isFixed }: {isFixed: boolean}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`w-full h-fit px-16 flex items-center justify-between py-5 bg-gray-100 z-20 shadow-lg ${isFixed? "fixed" : "static"}`}>
      <h3 className="font-heading text-4xl md:text-5xl font-bold text-red-800">
        <a href="/">SEA Salon</a>
      </h3>
      <nav className={`h-fit md:h-full w-[96%] md:w-fit md:flex items-center absolute md:static md:bg-gray-200 bg-red-900 md:py-0 py-5 md:shadow-none shadow-2xl z-20 ${
            isOpen ? "top-[75px] left-2" : "top-[-200px] left-0"
          }`}>
        <FlyoutLink href="/" FlyoutContent={null}>
          Home
        </FlyoutLink>
        <FlyoutLink href="/services" FlyoutContent={ServicesContent}>
          Services
        </FlyoutLink>
        <FlyoutLink href="/#contacts" FlyoutContent={null}>
          Contact
        </FlyoutLink>
        <button className="w-fit rounded-lg border-2 md:border-black ml-5 md:ml-10 px-8 py-1 text-gray-200 md:text-gray-900 font-bold text-xl font-economica transition-colors hover:bg-gray-900 hover:text-white hover:border-black">
          Log In
        </button>
      </nav>
      <div
        className="absolute top-7 right-14 md:hidden text-2xl dark:text-gray-200"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <FiX className="text-gray-800" /> : <FiAlignJustify className="text-gray-800" />}
      </div>
    </div>
  );
}
