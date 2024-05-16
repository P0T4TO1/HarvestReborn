import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface VerifyEmailTemplateProps {
  email: string;
  emailVerificationToken: string;
}

export const VerifyEmail = ({
  email,
  emailVerificationToken,
}: VerifyEmailTemplateProps) => (
  <Html>
    <Head />
    <Preview>Harvest Reborn - Verificación de correo electrónico</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src="https://res.cloudinary.com/dejx7jbmx/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1711170409/logo_po1cqc.jpg?_s=public-apps"
          width={48}
          height={48}
          alt="HR"
        />
        <Text style={body}>Hola {email},</Text>
        <Heading style={heading}>Tu enlace</Heading>
        <Section style={body}>
          <Text style={paragraph}>
            <Link style={link} href={emailVerificationToken}>
              👉 Clic aqui para verificar tu correo 👈
            </Link>
          </Text>
          <Text style={paragraph}>
            Si no solicitó esto, simplemente ignore y elimine este mensaje.
          </Text>
        </Section>
        <Text style={paragraph}>
          Gracias,
          <br />- el equipo de Harvest Reborn.
        </Text>
        <Hr style={hr} />
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 25px 48px",
  backgroundImage: 'url("/assets/raycast-bg.png")',
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat, no-repeat",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
};

const body = {
  margin: "24px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const link = {
  color: "#FF6363",
};

const hr = {
  borderColor: "#dddddd",
  marginTop: "48px",
};
