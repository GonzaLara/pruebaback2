import { productsManager } from "../data/manager.mongo.js";

class ProductsService {
  constructor() {
    this.manager = productsManager;
  }
  createOne = async (data) => await this.manager.createOne(data);
  readAll = async (filter) => await this.manager.readAll(filter);
  readById = async (id) => await productsManager.readById(id);
  updateById = async (id, data) => await productsManager.updateById(id, data);
  destroyById = async (id) => await productsManager.destroyById(id);
}

const productsService = new ProductsService();
export default productsService;
