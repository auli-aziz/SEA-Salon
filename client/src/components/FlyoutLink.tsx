import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

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
  const showDropDown = open && FlyoutContent;
  const navStyle = "relative pl-5 pb-2 md:py-0 md:hover:text-red-900 font-bold text-xl font-economica";

  return (
    <div className="relative h-fit w-fit flex items-center">
      <NavLink
        to={href}
        className={({isActive}) => (
          isActive? `${navStyle} + text-red-200 md:text-red-900` : `${navStyle} + text-gray-200 md:text-gray-900`
        )}
        end
      >
        {children}
      </NavLink>
      {FlyoutContent && (
        <FiChevronDown
          className={`text-md text-neutral-200 md:text-neutral-950 transition-tranform hidden md:block ${
            open ? "rotate-180" : ""
          }`}
          onClick={() => setOpen((prev) => !prev)}
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
