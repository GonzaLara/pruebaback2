import { Router } from "express";
import { usersManager } from "../../data/manager.mongo.js";
import passport from "../../middlewares/passport.mid.js";
import { verifyToken } from "../../helpers/token.util.js";

const authRouter = Router();

const registerCb = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "Registrado";
    const data = { method, url, message };
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const loginCb = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "Ingreso";

    // configurar la cookie con los datos del usuario
    const opts = { maxAge: 7 * 25 * 60 * 60 * 1000, signed: true };

    // enviar la respuesta al cliente
    const data = { method, url, message };
    const { user } = req;

    res.status(200).cookie("token", user.token, opts).json(data);
  } catch (error) {
    next(error);
  }
};

const signoutCb = (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "Salida";

    // Eliminar la cookie y enviar respuesta al cliente
    const data = { method, url, message };
    res.status(200).clearCookie("token").json(data);
  } catch (error) {
    next(error);
  }
};

const onlineCb = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;

    // Validar al usuario que esta conectado con las cookies
    const { token } = req.signedCookies;
    const dataToken = verifyToken(token);
    // Validar que es un usuario de la base de datos
    let user = await usersManager.readBy({ _id: dataToken?._id });
    if (!user) {
      const error = new Error("Credenciales invalidas");
      error.statusCode = 401;
      throw error;
    }
    const { password, createdAt, updatedAt, __v, ...rest } = user;
    const data = {
      method,
      url,
      user: rest,
    };
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const badAuthCb = (req, res, next) => {
  try {
    const error = new Error("Bad auth");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    next(error);
  }
};

const optsBadAuth = { session: false, failureRedirect: "/api/auth/bad-auth" };

authRouter.post(
  "/register",
  passport.authenticate("register", optsBadAuth),
  registerCb
);

authRouter.post("/login", passport.authenticate("login", optsBadAuth), loginCb);
authRouter.post("/signout", signoutCb);
authRouter.post("/online", onlineCb);
authRouter.get("/bad-auth", badAuthCb);
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
authRouter.get(
  "/google/redirect",
  passport.authenticate("google", optsBadAuth),
  loginCb
);

export default authRouter;
