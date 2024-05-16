import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface GithubAccessTokenEmailProps {
  email?: string;
  status?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const NegocioActivationEmail = ({
  email,
  status,
}: GithubAccessTokenEmailProps) => {
  if (status === "ACTIVO")
    return (
      <Html>
        <Head />
        <Preview>Se aprobó tu negocio!!!</Preview>
        <Body style={main}>
          <Container style={container}>
            <Img
              src="https://res.cloudinary.com/dejx7jbmx/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1711170409/logo_po1cqc.jpg?_s=public-apps"
              width={48}
              height={48}
              alt="HR"
            />

            <Text style={title}>
              <strong>{email}</strong>, se ha aprobado tu negocio!!!
            </Text>

            <Section style={section}>
              <Text style={text}>
                Ahora los clientes pueden ver tu negocio en la aplicación y
                realizar pedidos. Además, puedes contactar con ellos por medio
                del chat. ¡Gracias por confiar en nosotros!
              </Text>
              <Text style={text}>
                Inicia sesión para comenzar a aprovechar todas las funciones de
                la aplicación.
              </Text>

              <Button style={button} href={`${baseUrl}/auth/login`}>
                Iniciar sesión
              </Button>
            </Section>

            <Text style={footer}>Harvest Reborn</Text>
          </Container>
        </Body>
      </Html>
    );
  if (status === "INACTIVO")
    return (
      <Html>
        <Head />
        <Preview>Se ha suspendido tu negocio</Preview>
        <Body style={main}>
          <Container style={container}>
            <Img
              src="https://res.cloudinary.com/dejx7jbmx/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1711170409/logo_po1cqc.jpg?_s=public-apps"
              width={48}
              height={48}
              alt="HR"
            />

            <Text style={title}>
              <strong>{email}</strong>, lamentamos informarte que tu negocio ha
              sido suspendido.
            </Text>

            <Section style={section}>
              <Text style={text}>
                Si tienes alguna duda o crees que fue un error, por favor
                actualiza la información de tu negocio y contacta con nosotros.
              </Text>
              <Text style={text}>
                Por ahora, tu negocio no estará disponible para los clientes,
                solo tendrás acceso a la información de tu negocio, la gestión
                de tu inventario y a la configuración de la cuenta.
              </Text>

              <Button style={button} href={`${baseUrl}/auth/login`}>
                Iniciar sesión
              </Button>
            </Section>

            <Text style={footer}>Harvest Reborn</Text>
          </Container>
        </Body>
      </Html>
    );
};

NegocioActivationEmail.PreviewProps = {
  email: "alanturing",
} as GithubAccessTokenEmailProps;

export default NegocioActivationEmail;

const main = {
  backgroundColor: "#ffffff",
  color: "#24292e",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
  maxWidth: "480px",
  margin: "0 auto",
  padding: "20px 0 48px",
};

const title = {
  fontSize: "24px",
  lineHeight: 1.25,
};

const section = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  textAlign: "center" as const,
};

const text = {
  margin: "0 0 10px 0",
  textAlign: "left" as const,
};

const button = {
  fontSize: "14px",
  backgroundColor: "#28a745",
  color: "#fff",
  lineHeight: 1.5,
  borderRadius: "0.5em",
  padding: "12px 24px",
};

const links = {
  textAlign: "center" as const,
};

const link = {
  color: "#0366d6",
  fontSize: "12px",
};

const footer = {
  color: "#6a737d",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "60px",
};
