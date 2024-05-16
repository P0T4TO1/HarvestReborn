"use client";

import React from "react";

import { FaGithub } from "react-icons/fa";
import { Image, Link } from "@nextui-org/react";

export const Footer = () => {
  return (
    <>
      <footer className="relative bg-blueGray-200 pb-6">
        <hr className="mb-6 border-blueGray-300" />
        <div className="container mx-auto px-4 pt-8">
          <div className="flex flex-wrap text-left lg:text-left">
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex items-center">
                <Image
                  src={"/images/logo.png"}
                  alt={"logoFooter"}
                  width={50}
                  height={50}
                />
                <h4 className="text-3xl font-bold text-green-900 ml-2 ">
                  Harvest Reborn
                </h4>
              </div>
              <div className="mt-6 lg:mb-0 mb-6 flex">
                <Link
                  target={"_blank"}
                  href="https://github.com/P0T4TO1"
                  color="foreground"
                  className="text-xl"
                >
                  <FaGithub />
                </Link>
              </div>
              <div>
                <p className="mt-6 text-sm text-blueGray-500">
                  Built by{" "}
                  <Link
                    href={"https://github.com/P0T4TO1"}
                    target="_blank"
                    color="foreground"
                  >
                    Jaret García
                  </Link>
                  , Xavier Chanona
                </p>
                <p className="mt-6 text-sm text-blueGray-500">
                  Built with{" "}
                  <Link
                    href={"https://nextui.org"}
                    target="_blank"
                    color="foreground"
                  >
                    NextUI
                  </Link>{" "}
                  <Link
                    href={"https://github.com/nextui-org/nextui/blob/main/LICENSE"}
                    target="_blank"
                    color="foreground"
                  >
                    ©
                  </Link>
                </p>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full lg:w-4/12 px-4 ml-auto">
                  <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Navegación
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <Link
                        className="font-semibold mb-2 text-sm"
                        href={"/"}
                        color="foreground"
                      >
                        Inicio
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="font-semibold mb-2 text-sm"
                        href={"/stores"}
                        color="foreground"
                      >
                        Recauderías
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="font-semibold mb-2 text-sm"
                        href="/#aboutUs"
                        color="foreground"
                      >
                        Acerca de nosotros
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="font-semibold mb-2 text-sm"
                        href={process.env.NEXT_PUBLIC_SUPPORT_APP_URL}
                        color="foreground"
                      >
                        Soporte
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Otros recursos
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <Link
                        className="font-semibold mb-2 text-sm"
                        href={"/terms-conditions"}
                        color="foreground"
                      >
                        Términos y condiciones
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="font-semibold mb-2 text-sm"
                        href={"/privacy-policy"}
                        color="foreground"
                      >
                        Aviso de privacidad
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 font-semibold py-1">
              Copyright © <span id="get-current-year">2024</span>
              <Link
                href={process.env.NEXT_PUBLIC_APP_URL}
                target="_blank"
                color="foreground"
              >
                &nbsp; Harvest Reborn.
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
