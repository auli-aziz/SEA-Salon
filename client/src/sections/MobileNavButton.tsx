import { useContext } from "react";
import { FiAlignJustify, FiX } from "react-icons/fi";
import { NavbarContext } from "../contexts/navbar";

export default function MobileNavButton() {
  const { isFixed, isOpen, handleMobileNavButton } = useContext(NavbarContext);

  return (
    <div
      className="absolute top-7 right-14 md:hidden text-2xl dark:text-gray-200"
      onClick={handleMobileNavButton}
    >
      {isOpen ? (
        <FiX className={isFixed ? `text-gray-900` : "text-red-800"} />
      ) : (
        <FiAlignJustify
          className={isFixed ? `text-gray-900` : "text-red-800"}
        />
      )}
    </div>
  );
}
