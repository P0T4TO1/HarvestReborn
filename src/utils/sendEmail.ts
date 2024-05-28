import mailgun from "mailgun-js";

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY || "",
  domain: process.env.MAILGUN_DOMAIN || "",
});

export async function sendEmail(
  email: string,
  subject: string,
  emailHtml: string
) {
  const msg = {
    from: "Harvest Reborn<no-reply@harvestreborn.me>",
    to: email,
    subject: subject,
    html: emailHtml,
  };
  return mg.messages().send(msg);
}
