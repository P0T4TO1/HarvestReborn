import mailgun from "mailgun-js";
import nodemailer from "nodemailer";

// const mg = mailgun({
//   apiKey: process.env.MAILGUN_API_KEY || "",
//   domain: process.env.MAILGUN_DOMAIN || "",
// });

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// export async function sendEmail(
//   email: string,
//   subject: string,
//   emailHtml: string
// ) {
//   const msg = {
//     from: "Harvest Reborn<no-reply@harvest-reborn.vercel.app>",
//     to: email,
//     subject: subject,
//     html: emailHtml,
//   };
//   return mg.messages().send(msg);
// }

export async function sendEmail(
  email: string,
  subject: string,
  emailHtml: string
) {
  const mailOptions = {
    from: "Harvest Reborn<no-reply@harvestreborn.me>",
    to: email,
    subject: subject,
    html: emailHtml,
  };
  return transporter.sendMail(mailOptions);
}
