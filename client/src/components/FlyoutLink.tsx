import { useState } from "react";
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

  return (
    <div className="relative h-fit w-fit flex items-center">
      <a
        href={href}
        className="relative pl-5 pb-2 md:py-0 text-neutral-200 md:text-neutral-950 hover:text-red-500 font-bold text-xl font-economica"
      >
        {children}
      </a>
      {FlyoutContent && (
        <FiChevronDown
          className={`text-md text-neutral-200 md:text-neutral-950 transition-tranform hidden md:block ${
            open ? "rotate-180" : ""
          }`}
          onClick={() => setOpen((prev) => !prev)}
        />
      )}
      {showDropDown && (
        <div className="absolute hidden md:block left-1/2 top-12 -translate-x-1/2 bg-white text-black z-20">
          <FlyoutContent />
        </div>
      )}
    </div>
  );
};

export default FlyoutLink;
