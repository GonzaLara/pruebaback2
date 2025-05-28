import { Router } from "express";
import { productsManager } from "../../data/manager.mongo.js";

const productsRouter = Router();

const createOne = async (req, res, next) => {
  try {
    const data = req.body;
    const one = await productsManager.createOne(data);
    res.status(201).json({
      method: req.method,
      url: req.originalUrl,
      response: one,
    });
  } catch (error) {
    next(error);
  }
};

const readAll = async (req, res, next) => {
  try {
    const filter = req.query;
    const all = await productsManager.readAll(filter);
    if (all.lenght > 0) {
      res.status(200).json({
        method: req.method,
        url: req.originalUrl,
        response: all,
      });
    } else {
      const error = new Error("No encontrado");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const readById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const one = await productsManager.readById(id);
    if (one) {
      res.status(200).json({
        method: req.method,
        url: req.originalUrl,
        response: one,
      });
    } else {
      const error = new Error("No encontrado");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const one = await productsManager.updateById(id);
    if (one) {
      res.status(200).json({
        method: req.method,
        url: req.originalUrl,
        response: one,
      });
    } else {
      const error = new Error("No encontrado");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

const destroyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const one = await productsManager.destroyById(id);
    if (one) {
      res.status(200).json({
        method: req.method,
        url: req.originalUrl,
        response: one,
      });
    } else {
      const error = new Error("No encontrado");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

productsRouter.post("/", createOne);
productsRouter.get("/", readAll);
productsRouter.get("/:id", readById);
productsRouter.put("/:id", updateById);
productsRouter.delete("/id", destroyById);

export default productsRouter;
