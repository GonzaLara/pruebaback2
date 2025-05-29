import RouterHelper from "../../helpers/router.helper.js";
import { usersManager } from "../../data/manager.mongo.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import { verifyToken } from "../../helpers/token.util.js";

const registerCb = async (req, res) => res.json201(null, "Registrado");

const loginCb = async (req, res) => {
  const opts = { maxAge: 7 * 25 * 60 * 60 * 1000, signed: true };

  res.cookie("token", req.user.token, opts).json200(req.user._id, "Ingresado");
};

const signoutCb = (req, res) => {
  res.clearCookie("token").json200(req.user._id, "Desconectado");
};

const onlineCb = async (req, res) => {
  const { token } = req.signedCookies;
  const dataToken = verifyToken(token);
  let user = await usersManager.readBy({ _id: dataToken?._id });

  if (!user) {
    return res.json401("Credenciales inválidas");
  }

  res.json200(user);
};

const badAuthCb = (req, res) => res.json401();

const forbiddenCb = (req, res) => res.json403();

class AuthRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/register", ["PUBLIC"], passportCb("register"), registerCb);
    this.create("/login", ["PUBLIC"], passportCb("login"), loginCb);
    this.create("/signout", ["USER", "ADMIN"], signoutCb);
    this.read("/online", ["USER", "ADMIN"], onlineCb);
    this.read("/bad-auth", ["PUBLIC"], badAuthCb);
    this.read("/forbidden", ["PUBLIC"], forbiddenCb);
    this.read(
      "/google",
      ["PUBLIC"],
      passportCb("google", { scope: ["email", "profile"] })
    );
    this.read("/google/redirect", ["PUBLIC"], passportCb("google"), loginCb);
  };
}

const authRouter = new AuthRouter().getRouter();
export default authRouter;
