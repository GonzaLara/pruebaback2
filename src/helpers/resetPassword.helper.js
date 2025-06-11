const resetUserPass = async (email, verifyCode) => {
  await transport.sendMail({
    from: `EQUIPO CODER <${process.env.GOOGLE_EMAIL}>`,
    to: email,
    subject: "CORREO DE RESTAURACION DE CONTRASEÑA",
    html: `
      <section>
        <h1>RESTAURAR CONTRASEÑA</h1>
        <a href="${process.env.URL}/reset/${email}">RESTAURAR</a>
      </section>
    `,
  });
};
export default resetUserPass;