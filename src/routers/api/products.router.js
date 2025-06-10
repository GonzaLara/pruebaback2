import RouterHelper from "../../helpers/router.helper.js";
import productsController from "../../controllers/products.controller.js";

class ProductsRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["ADMIN"], productsController.createOne);
    this.read("/", ["PUBLIC"], productsController.readAll);
    this.read("/:id", ["PUBLIC"], productsController.readById);
    this.update("/:id", ["ADMIN"], productsController.updateById);
    this.destroy("/:id", ["ADMIN"], productsController.destroyById);
  };
}
const productsRouter = new ProductsRouter().getRouter();
export default productsRouter;
