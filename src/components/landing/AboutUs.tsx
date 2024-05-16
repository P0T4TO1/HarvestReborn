"use client";

import { FC } from "react";
import { Image, Card } from "@nextui-org/react";
import { motion } from "framer-motion";

export const AboutUsComponent: FC = () => {
  return (
    <section
      className="relative flex min-h-screen flex-col justify-center items-center overflow-hidden py-6 sm:py-12"
      id="aboutUs"
    >
      <div className="m-5 sm:m-10 flex flex-col items-center mx-auto max-w-screen-lg">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          animate={{
            opacity: 0,
            y: -50,
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
          variants={{
            hidden: {
              opacity: 0,
              y: -50,
            },
            visible: {
              opacity: 1,
              y: 0,
            },
          }}
          className="header flex w-full justify-center"
        >
          <h2 className="font-black pb-5 sm:pb-10 mb-10 sm:mb-20 text-2xl sm:text-4xl text-green-900 dark:text-green-500 before:block before:absolute before:bg-green-700  relative before:w-1/3 before:h-1 before:bottom-0 before:left-1/3">
            Acerca de nosotros
          </h2>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          animate={{
            opacity: 0,
            y: 50,
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
          variants={{
            hidden: {
              opacity: 0,
              y: 50,
            },
            visible: {
              opacity: 1,
              y: 0,
              x: 0,
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-10 w-full"
        >
          <Card isHoverable>
            <div className="p-4 sm:p-6">
              <h3 className="mb-2 sm:mb-4 font-semibold text-lg sm:text-2xl">
                <p className="transition-all">¿Quiénes somos?</p>
              </h3>
              <p className="text-sm sm:text-base mb-0">
                Somos un equipo apasionado y comprometido con la lucha contra el
                desperdicio de alimentos en la Ciudad de México. En{" "}
                <span className="font-semibold">Harvest Reborn</span>, creemos
                en el poder de la colaboración y la innovación para crear un
                impacto positivo en nuestra comunidad.
              </p>
            </div>
            <div className="mt-auto">
              <Image src={"/images/cards/harvest.jpg"} alt="harvestcard" />
            </div>
          </Card>
          <Card isHoverable>
            <div className="p-4 sm:p-6">
              <h3 className="mb-2 sm:mb-4 font-semibold text-lg sm:text-2xl">
                <p className="transition-all">Nuestra Misión</p>
              </h3>
              <p className="text-sm sm:text-base mb-0">
                Nuestra misión es abordar el desafío del desperdicio de
                alimentos al conectar a recauderías locales con posibles
                clientes que un negocio no alcanza normalmente. Creemos que cada
                alimento cuenta y que, trabajando juntos, podemos reducir
                significativamente el desperdicio y ayudar a aquellos que
                enfrentan la inseguridad alimentaria.
              </p>
            </div>
            <div className="mt-auto">
              <Image
                src={"/images/cards/recauderia_card.jpg"}
                alt=""
                className="w-full h-36 sm:h-48 object-cover"
              />
            </div>
          </Card>
          <Card isHoverable>
            <div className="p-4 sm:p-6">
              <h3 className="mb-2 sm:mb-4 font-semibold text-lg sm:text-2xl">
                <p className="transition-all">
                  ¿Por qué hacemos este proyecto?
                </p>
              </h3>
              <p className="text-sm sm:text-base mb-0">
                Nos inspira el deseo de marcar la diferencia y contribuir a un
                mundo más justo y sostenible. Sabemos que el desperdicio de
                alimentos es un problema urgente que afecta a millones de
                personas en todo el mundo, y estamos comprometidos a ser parte
                de la solución.
              </p>
            </div>
            <div className="mt-auto">
              <Image
                src={"/images/cards/desperdicio.jpg"}
                alt=""
                className="w-full h-36 sm:h-48 object-cover"
              />
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
