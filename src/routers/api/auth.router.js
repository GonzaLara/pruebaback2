import RouterHelper from "../../helpers/router.helper.js";
import authController from "../../controllers/auth.controllers.js";
import passportCb from "../../middlewares/passportCb.mid.js";

class AuthRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create(
      "/register",
      ["PUBLIC"],
      passportCb("register"),
      authController.registerCb
    );
    this.create(
      "/login",
      ["PUBLIC"],
      passportCb("login"),
      authController.loginCb
    );
    this.create("/signout", ["USER", "ADMIN"], authController.signoutCb);
    this.read("/online", ["USER", "ADMIN"], authController.onlineCb);
    this.read("/bad-auth", ["PUBLIC"], authController.badAuthCb);
    this.read("/forbidden", ["PUBLIC"], authController.forbiddenCb);
    this.read(
      "/google",
      ["PUBLIC"],
      passportCb("google", { scope: ["email", "profile"] })
    );
    this.read(
      "/google/redirect",
      ["PUBLIC"],
      passportCb("google"),
      authController.loginCb
    );
    // Esto es nuevo
    this.read(
      "/verify/:email/:verifyCode",
      ["PUBLIC"],
      authController.verifyCb
    );
    // 
  };
}

const authRouter = new AuthRouter().getRouter();
export default authRouter;
