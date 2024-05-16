"use client";

import { Image, Button, Link } from "@nextui-org/react";
import { motion } from "framer-motion";
import {
  FaRegArrowAltCircleRight,
  FaRegArrowAltCircleDown,
} from "react-icons/fa";
import { TextGenerateEffect } from "@/components";

const words =
  "El lugar donde tú y tu negocio ayudan a reducir el desperdicio de frutas y verduras en la Ciudad de México";

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: [40, -5, 0],
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
          >
            <p className="text-sm font-normal tracking-widest dark:text-gray-300 text-gray-600 uppercase mb-12">
              Harvest Reborn
            </p>
            <h1 className="text-4xl mt-6 font-bold sm:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-yellow-500">
                {" "}
                Unidos desperdiciamos menos{" "}
              </span>
            </h1>
            <TextGenerateEffect words={words} />

            <div className="flex items-center mt-8 sm:mt-12 space-x-4">
              <div className="relative inline-flex items-center justify-center group">
                <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-green-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                <Link href="/auth/register">
                  <Button
                    size="lg"
                    endContent={<FaRegArrowAltCircleRight />}
                    className="relative inline-flex items-center justify-center px-8 py-3 text-base font-normal dark:text-white dark:bg-black border border-transparent rounded-full"
                  >
                    {" "}
                    Únete ahora{" "}
                  </Button>
                </Link>
              </div>
              <div className="relative inline-flex items-center justify-center group">
                <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-green-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
                <Link href={"/#servicios"} title="">
                  <Button
                    size="lg"
                    endContent={<FaRegArrowAltCircleDown />}
                    className="relative inline-flex items-center justify-center px-8 py-3 text-base font-normal dark:text-white dark:bg-black border border-transparent rounded-full"
                  >
                    {" "}
                    Conoce más{" "}
                  </Button>
                </Link>
              </div>
            </div>

            <p className="mt-5 dark:text-gray-400 text-gray-600">
              Ya tienes una cuenta?{" "}
              <Link
                href={"/auth/login"}
                title=""
                className="transition-all duration-200 hover:underline"
                color="success"
              >
                Inicia sesión
              </Link>
            </p>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: [40, -5, 0],
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}>
            <Image
              className="w-full"
              src="/images/landing-page/hero-image.png"
              alt=""
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
