import { createContext } from "react";

interface ContextProps {
  isMenuOpen: boolean;
  toggleSideMenu: () => void;
  isGlobalOpen: boolean;
  toggleGlobalMenu: () => void;
}

export const UiContext = createContext({} as ContextProps);
