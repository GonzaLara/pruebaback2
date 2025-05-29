import "dotenv/config.js";
import express, { json, urlencoded } from "express";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import router from "./src/routers/index.router.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import dbConnect from "./src/helpers/dbConnect.helper.js";

// Config server
const server = express();
const port = process.env.PORT || 8080;
const ready = async () => {
  console.log("Servido listo en el puerto " + port);
  await dbConnect(process.env.URL_MONGO);
};
server.listen(port, ready);

// Config handlebars
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

// Config middlewares
server.use(cookieParser(process.env.SECRET));
server.use(urlencoded({ extended: true }));
server.use(json());
server.use(express.static("public"));
server.use(morgan("dev"));

// Config router
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);
