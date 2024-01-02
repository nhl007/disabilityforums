"use server";

import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/sendmail-transport";

const transporter = nodemailer.createTransport({
  host: process.env.DISCOURSE_SMTP_ADDRESS,
  port: 587,
  secure: false,
  auth: {
    user: process.env.DISCOURSE_SMTP_USER_NAME,
    pass: process.env.DISCOURSE_SMTP_PASSWORD,
  },
});

// var transporter = nodemailer.createTransport({
//   host: "sandbox.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "5e72871fd40e34",
//     pass: "585b570f54c334",
//   },
// });

export async function sendConfirmationEmail(email: string, token: string) {
  try {
    const confirmationLink = `http://localhost:3000/ndis-verification?token=${token}`;

    const mailOptions: MailOptions = {
      from: "admin@disabilityforums.com.au",
      to: email,
      subject: "NDIS-Verification",
      html: `Click <a href="${confirmationLink}">here</a> to verify as a NDIS Provider.`,
      text: "Please verify by clicking ",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(info.response);
      }
    });
    return true;
  } catch (error) {
    return false;
  }
}
