import sendEmail from "./email.util.js";

const verifyUserEmail = async (email, verifyCode) => {
  await sendEmail({
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
