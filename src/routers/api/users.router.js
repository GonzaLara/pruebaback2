import { Router } from "express";
import { createOne, readAll, readById, updateById, destroyById } from "../../controllers/users.controller.js"
import passportCb from "../../middlewares/passportCb.mid.js";

const usersRouter = Router();

usersRouter.post("/", passportCb("admin"), createOne);
usersRouter.get("/", passportCb("admin"), readAll);
usersRouter.get("/:id", passportCb("admin"), readById);
usersRouter.put("/:id", passportCb("user"), updateById);
usersRouter.delete("/id", passportCb("user"), destroyById);

export default usersRouter;
