import RouterHelper from "../helpers/router.helper.js";
import productsRepository from "../repositories/products.repository.js";
import cartsRepository from "../repositories/carts.repository.js";

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
  const user = req.user;
  res.status(200).render("profile", { user });
};

const cartViewCb = async (req, res) => {
  const user_id = req.user._id;
  const cartItems = await cartsRepository.readAll({ user_id });
  res.status(200).render("cart", { cartItems });
};

const verifyViewCb = async (req, res) => {
  const { email } = req.params
  res.status(200).render("verify", { email });
};

const resetViewCb = async (req, res) => {
  const { email } = req.params;
  res.status(200).render("reset", { email });
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
    this.render("/login", ["PUBLIC"], loginViewCb);
    this.render("/profile", ["USER", "ADMIN"], profileViewCb);
    this.render("/cart", ["USER", "ADMIN"], cartViewCb);
    this.render("/verify/:email", ["PUBLIC"], verifyViewCb)
    this.render("/reset/:email", ["PUBLIC"], resetViewCb);
  };
}

const viewsRouter = new ViewsRouter().getRouter();
export default viewsRouter;
