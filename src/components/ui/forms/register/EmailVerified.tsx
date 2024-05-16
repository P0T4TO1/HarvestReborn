"use client";

import { Button, Card, CardBody, Image, Link } from "@nextui-org/react";
import React from "react";

export const EmailVerified = () => {
  return (
    <section className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent">
      <div className="flex justify-center self-center z-10">
        <Card className="w-full max-w-md p-6">
          <CardBody className="text-center font-light">
            <Image
              src={"/images/email-check.png"}
              alt="Email Verification"
              classNames={{
                wrapper: "mx-auto mb-4",
                img: "w-36",
              }}
            />
            <h3 className="font-semibold text-2xl text-default-800">
              Tú cuenta ha sido verificada{" "}
            </h3>
            <p className="text-default-700 text-sm mt-4">
              Gracias por verificar tu cuenta. Ahora puedes disfrutar de todos
              los beneficios de nuestra aplicación.
            </p>
            <Link href={"/auth/login"} className="rounded-lg">
              <Button color="primary" className="w-full mt-6">
                Iniciar sesión
              </Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    </section>
  );
};
