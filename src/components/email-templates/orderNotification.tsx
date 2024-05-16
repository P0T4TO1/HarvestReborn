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

interface OrderNotificationEmailProps {
  email_cliente: string;
  email_negocio: string;
  fecha_orden: string;
  hora_orden: string;
  monto_total: number;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";

export const OrderNotificationEmail = ({
  email_cliente,
  email_negocio,
  fecha_orden,
  hora_orden,
  monto_total,
}: OrderNotificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Tiene un pedido nuevo</Preview>
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
              Nuevo pedido en Harvest Reborn
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hola {email_negocio}, tienes un nuevo pedido.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>{email_cliente}</strong> ha realizado un pedido por un
              total de <strong>${monto_total}</strong> el día{" "}
              <strong>
                {new Date(fecha_orden).toLocaleDateString("es-MX", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </strong>{" "}
              a las{" "}
              <strong>
                {new Date(hora_orden).toLocaleTimeString("es-MX", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </strong>
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
