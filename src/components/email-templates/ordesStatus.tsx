import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

interface OrderStatusEmailProps {
  id_orden: string;
  email_cliente: string;
  nombre_negocio: string;
  fecha_orden: Date;
  estado_orden: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";

export const OrderStatusEmail = ({
  id_orden,
  email_cliente,
  nombre_negocio,
  fecha_orden,
  estado_orden,
}: OrderStatusEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Estado de tu orden</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src="https://res.cloudinary.com/dejx7jbmx/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1711170409/logo_po1cqc.jpg?_s=public-apps"
                width="40"
                height="37"
                alt="Vercel"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Tu orden ha sido{" "}
              {estado_orden === "EN_PROCESO" ? "aceptada" : "rechazada"}
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hola {email_cliente}, tu orden con el número de folio{" "}
              <strong>{id_orden}</strong> en el negocio{" "}
              <strong>{nombre_negocio}</strong> ha sido{" "}
              {estado_orden === "EN_PROCESO" ? "aceptada" : "rechazada"}.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Fecha de la orden:{" "}
              {fecha_orden.toLocaleDateString("es-MX", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
              .
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={`${baseUrl}/orders`}
              >
                Consultalo aquí
              </Button>
            </Section>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Si usted no reconoce este pedido, por favor contacte a soporte.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
