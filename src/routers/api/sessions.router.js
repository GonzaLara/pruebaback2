import { Router } from "express";

const sessionsRouter = Router();

const createCb = (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "Sesion creada";
    const data = { method, url, message };
    req.session.role = "ADMIN";
    req.session.user_id = "abc123";
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const readCb = (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "Sesion leida";
    const sessions = req.session;
    const data = { method, url, message, sessions };
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const destroyCb = (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const message = "Sesion destruida";
    const data = { method, url, message };
    req.session.destroy();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

sessionsRouter.use("/create", createCb);
sessionsRouter.use("/read", readCb);
sessionsRouter.use("/destroy", destroyCb);

export default sessionsRouter;
