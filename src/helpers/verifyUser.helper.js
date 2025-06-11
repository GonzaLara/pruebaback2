import { transport } from "./sendEmail.helper.js";

const verifyUserEmail = async (email, verifyCode) => {
  await transport.sendMail({
    from: `EQUIPO CODER <${process.env.GOOGLE_EMAIL}>`,
    to: email,
    subject: "CORREO DE VERIFICACION DE CUENTA",
    html: `
      <section>
        <h1>CORREO DE VERIFICACION DE CUENTA</h1>
        <h3>CODIGO: ${verifyCode}</h3>
        <a href="${process.env.URL}/verify/${email}">VERIFICAR</a>
      </section>
    `,
  });
};

export default verifyUserEmail;