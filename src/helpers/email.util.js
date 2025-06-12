// import nodemailer from "nodemailer";

// const transport = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GOOGLE_EMAIL,
//     pass: process.env.GOOGLE_PASSWORD,
//   },
// });

// export default transport;

// helpers/email.util.js
import nodemailer from "nodemailer";

if (!process.env.GOOGLE_EMAIL || !process.env.GOOGLE_PASSWORD) {
  throw new Error("Faltan credenciales para Gmail");
}

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_PASSWORD,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transport.sendMail({
      from: `EQUIPO CODER <${process.env.GOOGLE_EMAIL}>`,
      to,
      subject,
      html,
    });
    return info;
  } catch (error) {
    console.error("Error enviando email:", error.message);
    throw new Error("No se pudo enviar el correo");
  }
};

export default sendEmail;
