import usersService from "../services/users.service.js";
import { verifyToken } from "../helpers/token.util.js";

class AuthController {
  constructor() {
    this.service = usersService;
  }
  registerCb = async (req, res) => res.json201(null, "Registrado");

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
      return res.json401("Credenciales inválidas");
    }

    res.json200(user);
  };

  badAuthCb = (req, res) => res.json401();

  forbiddenCb = (req, res) => res.json403();
}

const authController = new AuthController();
export default authController;
