import { FC, useReducer, ReactNode } from "react";
import { UiContext, uiReducer } from "./";

export interface UiState {
  isMenuOpen: boolean;
  isGlobalOpen: boolean;
}

const UI_INITIAL_STATE: UiState = {
  isMenuOpen: false,
  isGlobalOpen: false,
};

export const UiProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleSideMenu = () => {
    dispatch({ type: "[UI] - ToggleMenu" });
  };

  const toggleGlobalMenu = () => {
    dispatch({ type: "[UI] - ToggleGlobalMenu" });
  };

  return (
    <UiContext.Provider
      value={{
        ...state,
        toggleSideMenu,
        toggleGlobalMenu,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
