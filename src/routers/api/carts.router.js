import RouterHelper from "../../helpers/router.helper.js";
import { cartsManager } from "../../dao/mongo/dao.mongo.js";
// import { productsManager } from "../../dao/mongo/dao.mongo.js";
import productsRepository from "../../repositories/products.repository.js";

const createOne = async (req, res) => {
  const { product_id, quantity = 1 } = req.body;
  const user_id = req.user._id;

  const product = await productsRepository.readById(product_id);
  if (!product) return res.json404("Producto no encontrado");

  let cartItem = await cartsManager.readBy({ product_id, user_id });
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  if (currentQuantity + quantity > product.stock) {
    return res.json400(`No hay mas unidades disponibles`);
  }

  if (cartItem) {
    cartItem = await cartsManager.updateById(cartItem._id, {
      quantity: currentQuantity + quantity
    });
  } else {
    cartItem = await cartsManager.createOne({ product_id, user_id, quantity });
  }

  res.json201(cartItem);
};

const removeOne = async (req, res) => {
  const { product_id } = req.body;
  const user_id = req.user._id;

  const item = await cartsManager.readBy({ product_id, user_id });
  if (!item) return res.json404("Producto no encontrado en el carrito");

  if (item.quantity > 1) {
    await cartsManager.updateById(item._id, { quantity: item.quantity - 1 });
  } else {
    await cartsManager.destroyById(item._id);
  }

  res.json200("Unidad eliminada del carrito");
};

const removeAll = async (req, res) => {
  const { product_id } = req.body;
  const user_id = req.user._id;

  const item = await cartsManager.readBy({ product_id, user_id });
  if (!item) return res.json404("Producto no encontrado en el carrito");

  await cartsManager.destroyById(item._id);
  res.json200("Producto eliminado completamente del carrito");
};

class CartsRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }

  init = () => {
    this.create("/", ["USER", "ADMIN"], createOne);
    this.update("/remove-one", ["USER", "ADMIN"], removeOne);
    this.destroy("/remove-all", ["USER", "ADMIN"], removeAll);
  };
}

const cartsRouter = new CartsRouter().getRouter();

export default cartsRouter;
