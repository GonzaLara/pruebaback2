import jwt from "jsonwebtoken";
import sendEmail from "./email.util.js";

const sendResetPasswordEmail = async (user) => {
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.SECRET,
    { expiresIn: "1h" }
  );

  const link = `${process.env.URL}/reset-password/${token}`;

  await sendEmail({
    to: user.email,
    subject: "Restablecer contraseña",
    html: `
    <h1>Restaurar contraseña</h1>
    <p>Clic en el siguiente enlace para establecer una nueva contraseña:</p>
    <a href="${link}">Restablecer contraseña</a>
    <p>Este enlace expira en 1 hora.</p>
  `,
  });
};

export default sendResetPasswordEmail;
