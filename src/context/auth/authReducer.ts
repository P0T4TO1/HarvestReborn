import { AuthState } from "./";
import { IUser } from "@/interfaces";

type AuthActionType =
  | { type: "[Auth] - Login"; payload: IUser }
  | { type: "[Auth] - Logout" }
  | {
      type: "[Auth] - SetPersonalData";
      payload: {
        nombre: string;
        apellidos: string;
        fecha_nacimiento: string;
        tipo: string;
      };
    }
  | {
      type: "[Auth] - SetContactData";
      payload: {
        nombreNegocio: string;
        telefono: string;
        calle: string;
        colonia: string;
        cp: string;
      };
    }
  | {
      type: "[Auth] - SetUserData";
      payload: { email: string; password: string; isEmailVerified: boolean };
    }
  | { type: "[Auth] - SetIndexActive"; payload: number };

export const authReducer = (
  state: AuthState,
  action: AuthActionType
): AuthState => {
  switch (action.type) {
    case "[Auth] - Login":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };

    case "[Auth] - Logout":
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      };
    case "[Auth] - SetPersonalData":
      return {
        ...state,
        personalData: action.payload,
      };
    case "[Auth] - SetContactData":
      return {
        ...state,
        contactData: action.payload,
      };
    case "[Auth] - SetUserData":
      return {
        ...state,
        userData: action.payload,
      };
    case "[Auth] - SetIndexActive":
      return {
        ...state,
        indexActive: action.payload,
      };
    default:
      return state;
  }
};
