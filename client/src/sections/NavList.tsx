import { useContext } from "react";
import FlyoutLink from "../components/FlyoutLink";
import ServicesContent from "../components/AboutContent";
import AuthButton from "../components/AuthButton";
import { NavbarContext } from "../contexts/navbar";
import { useRouteLoaderData } from "react-router-dom";

export default function NavList() {
  const { path, isOpen, isFixed } = useContext(NavbarContext);
  const token = useRouteLoaderData("root") as string | null;
  const role = localStorage.getItem("role");

  return (
    <nav
      className={`h-fit md:h-full w-[96%] md:w-fit flex md:flex-row flex-col items-center absolute md:static md:rounded-xl bg-red-900 md:py-0 py-5 md:shadow-none shadow-2xl z-20 ${
        isOpen ? "top-[75px] left-2" : "top-[-250px] left-2"
      } ${(isFixed || path !== "/") ? "md:bg-white" : "md:bg-transparent"}`}
    >
      <FlyoutLink href="/" FlyoutContent={null}>
        Home
      </FlyoutLink>
      {token && (
        <FlyoutLink
          href={role === "admin" ? "/admin" : "/dashboard"}
          FlyoutContent={null}
        >
          Dashboard
        </FlyoutLink>
      )}
      <FlyoutLink href="/aboutus" FlyoutContent={ServicesContent}>
        About Us
      </FlyoutLink>
      <a
        href="/#contacts"
        className={`relative md:pl-5 md:py-0 text-gray-200 md:hover:text-red-900 hover:text-red-200 font-bold text-xl font-economica ${
          (isFixed || path !== "/") ? "md:text-gray-900" : "md:text-white"
        }`}
      >
        Contact
      </a>
      <AuthButton isAdminDashboard={false} isLogin={!token} />
    </nav>
  );
}
