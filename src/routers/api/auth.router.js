import RouterHelper from "../../helpers/router.helper.js";
import authController from "../../controllers/auth.controllers.js";
import passportCb from "../../middlewares/passportCb.mid.js";

class AuthRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
 this.create("/register", ["PUBLIC"], passportCb("register"), authController.registerCb);
    this.create("/login", ["PUBLIC"], passportCb("login"), authController.loginCb);
    this.create("/signout", ["USER", "ADMIN"], authController.signoutCb);
    this.read("/online", ["USER", "ADMIN"], authController.onlineCb);
    this.read("/verify/:email/:verifyCode", ["PUBLIC"], authController.verifyCb);
    this.create("/send-reset", ["PUBLIC"], authController.sendResetEmailCb);
    this.read("/reset/:token", ["PUBLIC"], authController.resetFormCb);
    this.create("/reset/:token", ["PUBLIC"], authController.resetConfirmCb);
    this.read("/bad-auth", ["PUBLIC"], authController.badAuthCb);
    this.read("/forbidden", ["PUBLIC"], authController.forbiddenCb);
  };
}

const authRouter = new AuthRouter().getRouter();
export default authRouter;
