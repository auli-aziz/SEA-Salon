import { createContext } from "react";

export const NavbarContext = createContext({
  path: "",
  isFixed: false,
  isOpen: false,
  handleMobileNavButton: () => {}
});