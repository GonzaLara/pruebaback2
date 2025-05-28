import { Router } from "express";
import usersRouter from "./api/users.router.js";
import productsRouter from "./api/products.router.js";
import cartsRouter from "./api/carts.router.js";

const apiRouter = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/carts", cartsRouter);

export default apiRouter;
