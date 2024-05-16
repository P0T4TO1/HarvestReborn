import * as React from "react";
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

interface EmailProps {
  email: string;
  resetPasswordToken: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const ResetPassEmail: React.FC<Readonly<EmailProps>> = ({
  email,
  resetPasswordToken,
}) => {
  return (
    <Html lang="en">
      <Head />
      <Preview>Harvest Reborn - Restablecer contraseña</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://res.cloudinary.com/dejx7jbmx/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1711170409/logo_po1cqc.jpg?_s=public-apps"
            width="40"
            height="33"
            alt="HR"
          />
          <Section>
            <Text style={text}>Hola {email},</Text>
            <Text style={text}>
              Alguien solicitó recientemente un cambio de contraseña para tu
              cuenta de Harvest Reborn. Si eres tú, puedes establecer una nueva
              contraseña aquí:
            </Text>
            <Button style={button} href={resetPasswordToken}>
              Restablecer contraseña
            </Button>
            <Text style={text}>
              Si no desea cambiar su contraseña o no lo solicitó, simplemente
              ignore y elimine este mensaje.
            </Text>
            <Text style={text}>
              Para mantener su cuenta segura, no reenvíe este correo electrónico
              a nadie. Consulte nuestro Centro de ayuda para{" "}
              <Link style={anchor} href={`${baseUrl}/support`}>
                más consejos de seguridad.
              </Link>
            </Text>
            <Text style={text}>Gracias, el equipo de Harvest Reborn.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

const anchor = {
  textDecoration: "underline",
};