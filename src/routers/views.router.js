import RouterHelper from "../helpers/router.helper.js";
import { productsManager } from "../data/manager.mongo.js";

const homeViewCb = async (req, res) => {
  const products = await productsManager.readAll();
  res.status(200).render("index", { products });
};

const productViewCb = async (req, res) => {
  const { pid } = req.params;
  const product = await productsManager.readById(pid);
  res.status(200).render("product", { product });
};

const registerViewCb = async (req, res) => {
  const products = await productsManager.readAll();
  res.status(200).render("register", { products });
};

const loginViewCb = async (req, res) => {
  const products = await productsManager.readAll();
  res.status(200).render("login", { products });
};

const profileViewCb = async (req, res) => {
  const products = await productsManager.readAll();
  res.status(200).render("profile", { products });
};

class ViewsRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.render("/",["PUBLIC"], homeViewCb);
    this.render("/product/:pid", ["PUBLIC"], productViewCb);
    this.render("/register", ["PUBLIC"], registerViewCb);
    this.render("/login", ["PUBLIC"],loginViewCb);
    this.render("/profile", ["USER", "ADMIN"],profileViewCb);
  };
}

const viewsRouter = new ViewsRouter().getRouter();

export default viewsRouter;
