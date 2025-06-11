import usersService from "../services/users.service.js";
import { verifyToken } from "../helpers/token.util.js";
import verifyUserEmail from "../helpers/verifyUser.helper.js";

class AuthController {
  constructor() {
    this.service = usersService;
  }
  // registerCb = async (req, res) => res.json201(null, "Registrado");
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

  // Esto es nuevo
  verifyCb = async (req, res) => {
    const { email, verifyCode } = req.params;
    const user = await this.service.readBy({ email, verifyCode });
    if (!user) {
      return res.json404();
    }

    await this.service.updateById(user._id, { isVerified: true });
    res.json200({ isVerified: true });
  };
  //
}

const authController = new AuthController();
export default authController;
