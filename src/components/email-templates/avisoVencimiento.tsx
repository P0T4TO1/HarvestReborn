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
import { ILote } from "@/interfaces";
import * as React from "react";
import { today, getLocalTimeZone } from "@internationalized/date";

interface AvisoNotificationEmailProps {
  email_negocio: string;
  lote: ILote;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";

export const VencimientoNotificationEmail = ({
  email_negocio,
  lote,
}: AvisoNotificationEmailProps) => {
  const fechaVencimiento = new Date(lote.fecha_vencimiento);
  const fechaHoy = new Date(today(getLocalTimeZone()).toString());
  const diferencia = fechaVencimiento.getTime() - fechaHoy.getTime();
  const diasRestantes = Math.floor(diferencia / (1000 * 60 * 60 * 24));

  return (
    <Html>
      <Head />
      <Preview>Lote apunto de vencer</Preview>
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
              Tienes un lote apunto de vencer
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hola <strong>{email_negocio}</strong>, te informamos que uno de
              tus lotes está apunto de vencer. Por favor revisa el detalle de tu
              inventario.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Te recomendamos que crees una publicación para vender tus
              productos antes de que caduquen.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Lote: <strong>{lote.id_lote}</strong>
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Dias antes de vencer: <strong>{diasRestantes}</strong>
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Producto: <strong>{lote.producto.nombre_producto}</strong>
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Cantidad:{" "}
              <strong>
                {lote.last_cantidad !== 0
                  ? lote.last_cantidad
                  : lote.cantidad_producto}{" "}
                kg
              </strong>
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Fecha de vencimiento:{" "}
              <strong>
                {new Date(lote.fecha_vencimiento).toLocaleDateString("es-MX", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </strong>
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={`${baseUrl}/inventory`}
              >
                Consultalo aquí
              </Button>
            </Section>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Harvest Reborn
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
