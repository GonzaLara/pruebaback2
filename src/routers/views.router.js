import RouterHelper from "../helpers/router.helper.js";
// import { productsManager } from "../dao/factory.js";
import productsRepository from "../repositories/products.repository.js";
import { cartsManager } from "../dao/mongo/dao.mongo.js";

const homeViewCb = async (req, res) => {
  const products = await productsRepository.readAll();
  res.status(200).render("index", { products });
};

const productViewCb = async (req, res) => {
  const { pid } = req.params;
  const product = await productsRepository.readById(pid);
  res.status(200).render("product", { product });
};

const registerViewCb = async (req, res) => {
  const products = await productsRepository.readAll();
  res.status(200).render("register", { products });
};

const loginViewCb = async (req, res) => {
  const products = await productsRepository.readAll();
  res.status(200).render("login", { products });
};

const profileViewCb = async (req, res) => {
  const products = await productsRepository.readAll();
  res.status(200).render("profile", { products });
};

const cartViewCb = async (req, res) => {
  const user_id = req.user._id;
  const cartItems = await cartsManager.readAll({ user_id });
  res.status(200).render("cart", { cartItems });
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
    this.render("/cart", ["USER", "ADMIN"], cartViewCb);
  };
}

const viewsRouter = new ViewsRouter().getRouter();

export default viewsRouter;
