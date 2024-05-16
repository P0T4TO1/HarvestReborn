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

export const UserStatusEmail = ({
  email,
  status,
}: GithubAccessTokenEmailProps) => {
  if (status === "ACTIVO")
    return (
      <Html>
        <Head />
        <Preview>Se activo tu usuario</Preview>
        <Body style={main}>
          <Container style={container}>
            <Img
              src="https://res.cloudinary.com/dejx7jbmx/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1711170409/logo_po1cqc.jpg?_s=public-apps"
              width={48}
              height={48}
              alt="HR"
            />

            <Text style={title}>
              <strong>{email}</strong>, tu usuario ha sido activado.
            </Text>

            <Section style={section}>
              <Text style={text}>
                Tu usuario ha sido activado correctamente, ahora puedes comenzar
                a utilizar la aplicación.
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
        <Preview>Se ha suspendido tu cuenta</Preview>
        <Body style={main}>
          <Container style={container}>
            <Img
              src="https://res.cloudinary.com/dejx7jbmx/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1711170409/logo_po1cqc.jpg?_s=public-apps"
              width={48}
              height={48}
              alt="HR"
            />

            <Text style={title}>
              <strong>{email}</strong>, lamentamos informarte que tu cuenta ha
              sido suspendida.
            </Text>

            <Section style={section}>
              <Text style={text}>
                Cuando tu cuenta es suspendida, no podrás acceder a la
                aplicación ni a tus datos, si crees que fue un error, por favor
                contacta con nosotros.
              </Text>

              <Button style={button} href={`${baseUrl}/support`}>
                Contactar soporte
              </Button>
            </Section>

            <Text style={footer}>Harvest Reborn</Text>
          </Container>
        </Body>
      </Html>
    );
};

UserStatusEmail.PreviewProps = {
  email: "alanturing",
} as GithubAccessTokenEmailProps;

export default UserStatusEmail;

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
