import { UiState } from "./";

type UiActionType =
  | { type: "[UI] - ToggleMenu" }
  | { type: "[UI] - ToggleGlobalMenu" };

export const uiReducer = (state: UiState, action: UiActionType): UiState => {
  switch (action.type) {
    case "[UI] - ToggleMenu":
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };
    case "[UI] - ToggleGlobalMenu":
      return {
        ...state,
        isGlobalOpen: !state.isGlobalOpen,
      };

    default:
      return state;
  }
};
