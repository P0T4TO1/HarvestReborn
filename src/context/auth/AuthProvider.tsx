"use client";

import React, { useReducer, useEffect, ReactNode } from "react";
import { useSession, signOut } from "next-auth/react";

import Cookies from "js-cookie";
import axios from "axios";

import { AuthContext, authReducer } from "./";

import { IUser } from "@/interfaces";
import { hrApi } from "@/api";

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
  userData: { email: string; password: string; isEmailVerified: boolean };
  personalData: {
    nombre: string;
    apellidos: string;
    fecha_nacimiento: string;
    tipo: string;
  };
  contactData: {
    nombreNegocio: string;
    telefono: string;
    calle: string;
    colonia: string;
    cp: string;
  };
  indexActive: number;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
  userData: { email: "", password: "", isEmailVerified: false },
  personalData: {
    nombre: "",
    apellidos: "",
    fecha_nacimiento: "",
    tipo: "",
  },
  contactData: {
    nombreNegocio: "",
    telefono: "",
    calle: "",
    colonia: "",
    cp: "",
  },
  indexActive: 1,
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const { data, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      dispatch({ type: "[Auth] - Login", payload: data?.user as IUser });
    }
  }, [status, data]);

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await hrApi.post("/user/login", { email, password });
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: user });
      return true;
    } catch (error) {
      return false;
    }
  };

  const registerContext = async (registerData: {
    email: string;
    password: string;
    tipo: string;
    nombre: string;
    apellidos: string;
    fecha_nacimiento: string;
    nombreNegocio: string;
    telefono: string;
    calle: string;
    colonia: string;
    alcaldia: string;
    cp: string;
  }): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await hrApi.post("/user/register", registerData);
      const { token, user } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: user });
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
      return {
        hasError: true,
        message: "No se pudo crear el usuario - intente de nuevo",
      };
    }
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("next-auth.session-token");
    Cookies.remove("next-auth.csrf-token");
    Cookies.remove("next-auth.callback-url");

    signOut({ callbackUrl: "/auth/login", redirect: true }).then(() => {
      dispatch({ type: "[Auth] - Logout" });
    });
  };

  const setUserData = (userData: {
    email: string;
    password: string;
    isEmailVerified: boolean;
  }) => {
    dispatch({ type: "[Auth] - SetUserData", payload: userData });
  };

  const setPersonalData = (data: any) => {
    dispatch({ type: "[Auth] - SetPersonalData", payload: data });
  };

  const setContactData = (data: any) => {
    dispatch({ type: "[Auth] - SetContactData", payload: data });
  };

  const setIndexActive = (index: number): void => {
    dispatch({ type: "[Auth] - SetIndexActive", payload: index });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        loginUser,
        registerContext,
        logout,
        userData: state.userData,
        personalData: state.personalData,
        contactData: state.contactData,
        indexActive: state.indexActive,
        setUserData,
        setPersonalData,
        setContactData,
        setIndexActive,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
