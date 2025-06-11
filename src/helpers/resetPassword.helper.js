import jwt from "jsonwebtoken";
import transport from "./email.util.js";

const sendResetPasswordEmail = async (user) => {
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.SECRET,
    { expiresIn: "1h" }
  );

  const link = `${process.env.URL}/reset-password/${token}`;

  await transport.sendMail({
    from: `EQUIPO CODER <${process.env.GOOGLE_EMAIL}>`,
    to: user.email,
    subject: "Restablecer contraseña",
    html: `
      <h1>Restaurar contraseña</h1>
      <p>Hacé clic en el siguiente enlace para establecer una nueva contraseña:</p>
      <a href="${link}">Restablecer contraseña</a>
      <p>Este enlace expirará en 1 hora.</p>
    `,
  });
};

export default sendResetPasswordEmail;
