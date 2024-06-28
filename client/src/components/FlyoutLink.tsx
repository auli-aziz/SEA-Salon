import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { NavbarContext } from "../contexts/navbar";

const FlyoutLink = ({
  children,
  href,
  FlyoutContent,
}: {
  children: React.ReactNode;
  href: string;
  FlyoutContent: React.ElementType | null;
}) => {
  const [open, setOpen] = useState(false);
  const { path, isFixed } = useContext(NavbarContext);

  const navStyle = "relative md:pl-5 pb-2 md:py-0 md:hover:text-red-900 font-bold text-xl font-economica";
  const activeStyle = "text-red-200 md:text-red-900";
  const inactiveStyle = `text-gray-200 ${ (isFixed || path !== "/") ? "md:text-gray-900" : "md:text-white"}`;
  
  const showDropDown = open && FlyoutContent;

  return (
    <div className="relative h-fit w-fit flex items-center">
      <NavLink
        to={href}
        className={({isActive}) => (
          isActive? `${navStyle} + ${activeStyle}` : `${navStyle} + ${inactiveStyle}`
        )}
        end
      >
        {children}
      </NavLink>
      {FlyoutContent && (
        <FiChevronDown
          className={`text-md transition-tranform hidden md:block ${
            open ? "rotate-180" : ""
          } ${
            (isFixed || path !== "/") ? "text-black" : "text-white"
          }`}
          onClick={() => setOpen((curr) => !curr)}
        />
      )}
      {showDropDown && (
        <div className="absolute hidden md:block left-1/2 top-12 -translate-x-1/2 bg-white text-black font-montserrat z-20">
          <FlyoutContent />
        </div>
      )}
    </div>
  );
};

export default FlyoutLink;
