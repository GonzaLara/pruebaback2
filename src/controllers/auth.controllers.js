import usersService from "../services/users.service.js";
import { verifyToken } from "../helpers/token.util.js";
import verifyUserEmail from "../helpers/verifyUser.helper.js";
import { createHash, compareHash } from "../helpers/hash.util.js";
import sendResetPasswordEmail from "../helpers/resetPassword.helper.js";

class AuthController {
  constructor() {
    this.service = usersService;
  }

  registerCb = async (req, res) => {
    const user = await this.service.readBy({ email: req.body.email });
    if (!user) return res.json400("No se pudo registrar");

    await verifyUserEmail(user.email, user.verifyCode);

    res.json201(null, "Registrado. Verifica tu email.");
  };

  loginCb = async (req, res) => {
    const opts = { maxAge: 7 * 25 * 60 * 60 * 1000, signed: true };

    res
      .cookie("token", req.user.token, opts)
      .json200(req.user._id, "Ingresado");
  };

  signoutCb = (req, res) => {
    res.clearCookie("token").json200(req.user._id, "Desconectado");
  };

  onlineCb = async (req, res) => {
    const { token } = req.signedCookies;
    const dataToken = verifyToken(token);
    let user = await this.service.readById(dataToken?._id);

    if (!user) {
      return res.json401("Credenciales invalidas");
    }

    res.json200(user);
  };

  badAuthCb = (req, res) => res.json401();

  forbiddenCb = (req, res) => res.json403();

  verifyCb = async (req, res) => {
    const { email, verifyCode } = req.params;
    const user = await this.service.readBy({ email, verifyCode });
    if (!user) {
      return res.json404();
    }

    await this.service.updateById(user._id, { isVerified: true });
    res.json200({ isVerified: true });
  };

  sendResetEmailCb = async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) return res.json400("El email es requerido");

      const user = await this.service.readBy({ email });
      if (!user) return res.json404("Usuario no encontrado");

      await sendResetPasswordEmail(user);

      res.json200(null, "Correo de recuperación enviado");
    } catch (error) {
      console.error("Error en sendResetEmailCb:", error);
      res.json500("Error al enviar el correo");
    }
  };

  resetFormCb = async (req, res) => {
    const { token } = req.params;
    try {
      const { _id } = verifyToken(token);
      return res.render("reset", { token });
    } catch {
      return res.render("expired");
    }
  };

resetConfirmCb = async (req, res) => {
    try {
      const { token } = req.params;
      const { password, confirm } = req.body;

      if (!password || !confirm) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }

      if (password !== confirm) {
        return res.status(400).json({ error: "Las contraseñas no coinciden" });
      }

      const data = verifyToken(token);

      if (!data || data.expired) {
        return res.status(401).json({ error: "Token expirado o inválido" });
      }

      const user = await this.service.readBy({ email: data.email });

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const mismaClave = compareHash(password, user.password);
      if (mismaClave) {
        return res.status(400).json({ error: "La nueva contraseña no puede ser igual a la anterior" });
      }

      const hashedPass = createHash(password);
      await this.service.updateById(user._id, { password: hashedPass });

      return res.status(200).json({ message: "Contraseña actualizada correctamente" });
    } catch (error) {
      console.error("Error en resetConfirmCb:", error.message);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  };
}

const authController = new AuthController();
export default authController;
