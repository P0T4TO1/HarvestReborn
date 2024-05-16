"use client";

import { useContext, useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "@/context/auth";
import {
  UserDataForm,
  ContactDataForm,
  PersonalDataForm,
  EmailVerificationForm,
} from "@/components";
import { signIn } from "next-auth/react";
import {
  CircularProgress,
  Link,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "@nextui-org/react";

import { type Session } from "next-auth";

interface RegisterFormProps {
  user?: Session["user"] | null;
}

export const RegisterForm = ({ user }: RegisterFormProps) => {
  const { indexActive, setIndexActive, setPersonalData, setUserData, userData } =
    useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user?.id_rol === 4) {
      setPersonalData({
        nombre: user.nombre ?? "",
        apellidos: user.apellidos ?? "",
        fecha_nacimiento: "",
        tipo: "",
      });
      setUserData({
        email: user.email,
        password: user.password ?? "",
        isEmailVerified: true,
      });
      setIndexActive(2);
    }
  }, [user]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-row justify-center bg-transparent">
      {loading ? (
        <div className="flex flex-col justify-center items-center self-center z-10">
          <p className="text-gray-700 dark:text-gray-300 text-4xl">
            Cargando...
          </p>
          <CircularProgress size="lg" color="primary" />
        </div>
      ) : (
        <div className="flex justify-center self-center z-10">
          <Card
            shadow="lg"
            className={`p-6 ${
              indexActive === 1
                ? "xl:w-[396px] w-96 sm:w-full md:w-[428px]"
                : "xl:w-[542px] w-96 sm:w-full md:w-[620px]"
            }`}
          >
            <CardHeader className="flex flex-col items-start">
              <h3 className="font-semibold text-4xl dark:text-gray-300 light:text-gray-300">
                {indexActive === 1
                  ? "Datos de usuario"
                  : indexActive === 2
                  ? "Datos personales"
                  : "Datos de contacto"}
              </h3>
              <p className="text-gray-400">
                ¿Ya tienes una cuenta?{" "}
                <Link
                  href={"/auth/login"}
                  className="text-sm text-green-700 hover:text-green-800 hover:underline"
                >
                  Inicia sesión
                </Link>
              </p>
            </CardHeader>
            <CardBody>
              <div className={`${indexActive !== 1 && "hidden"}`}>
                <UserDataForm />
              </div>

              <div className={`${indexActive !== 2 && "hidden"}`}>
                <PersonalDataForm isOAuth={!!user} />
              </div>

              <div className={`${indexActive !== 3 && "hidden"}`}>
                <ContactDataForm />
              </div>

              <div className={`${indexActive !== 4 && "hidden"}`}>
                <EmailVerificationForm email={userData.email} />
              </div>

              <div>
                {!user && (
                  <>
                    <div className="flex items-center justify-center space-x-2 my-5 text-center">
                      <span className="h-px w-40 bg-gray-400"></span>
                      <span className="text-gray-600 dark:text-gray-300 font-normal text-sm">
                        o registrate con
                      </span>
                      <span className="h-px w-40 bg-gray-400"></span>
                    </div>
                    <div className="flex justify-center gap-5 w-full ">
                      <button
                        type="button"
                        onClick={() => signIn("google")}
                        className="w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:border-gray-500 hover:text-yellow-700 text-sm dark:text-gray-300 dark:hover:text-yellow-700 text-gray-500 p-3  rounded-lg tracking-wide font-medium  cursor-pointer transition ease-in duration-500"
                      >
                        <FcGoogle className="mr-2" />
                        <span>Google</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </CardBody>
            <span className="h-px w-full my-3 bg-gray-400"></span>
            <CardFooter>
              <div className="text-center text-gray-500 text-xs">
                <p className="text-xs">
                  Una vez registrado, aceptas nuestros{" "}
                  <Link href={"/terms-conditions"} className="underline text-sm text-gray-600 dark:text-gray-400">
                    Términos de uso
                  </Link>{" "}
                  y confirmas que leiste nuestro{" "}
                  <Link href={"/privacy-policy"} className="underline text-sm text-gray-600 dark:text-gray-400">
                    Aviso de Privacidad
                  </Link>
                  .
                </p>
                <span className="flex justify-center items-center mt-2">
                  Copyright © 2024
                  <Link href={"/"} rel="" className="text-green-500 text-sm">
                    &nbsp; Harvest Reborn
                  </Link>
                </span>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </section>
  );
};
