import { createTransport } from "nodemailer";

const transport = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_PASSWORD,
  },
});
export { transport };

const sendEmail = async (email) => {
  await transport.sendMail({
    from: process.env.GOOGLE_EMAIL,
    to: email,
    subject: "CORREO DE PRUEBA",
    html: "<h1>NODEMAILER PRUEBA</h1>",
  });
};
export default sendEmail;