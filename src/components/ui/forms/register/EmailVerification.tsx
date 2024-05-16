"use client";

import React from "react";
import { Image, Card, CardBody } from "@nextui-org/react";

type Props = {
  email?: string;
};

export const EmailVerificationForm = ({ email }: Props) => {
  return (
    <section className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent">
      <div className="flex justify-center self-center z-10">
        <Card className="w-full max-w-md p-6">
          <CardBody className="text-center font-light">
            <Image
              src={"/images/email-send.png"}
              alt="Email Verification"
              classNames={{
                wrapper: "mx-auto mb-4",
                img: "w-36",
              }}
            />
            <h3 className="font-semibold text-2xl text-default-800">
              Revise su correo electrónico{" "}
            </h3>
            <p className="text-default-700 text-sm mt-4">
              Ya casi está listo, solo falta un paso más. Hemos enviado un
              correo a{" "}
              <strong className="text-defautl-800 font-semibold">
                {email}
              </strong>{" "}
              con un enlace de verificación.
            </p>
            <p className="text-default-700 text-sm mt-4">
              Si no lo encuentra,
              <strong className="text-defautl-800 font-semibold">
                {" "}
                revise su bandeja de correo no deseado.
              </strong>
            </p>
          </CardBody>
        </Card>
      </div>
    </section>
  );
};
