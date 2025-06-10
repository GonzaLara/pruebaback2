import { cartsManager } from "../dao/factory.js";
import CartsDTO from "../dto/carts.dto.js";

class CartsRepository {
  constructor() {
    this.manager = cartsManager;
  }
  createOne = async (data) => await this.manager.createOne(new CartsDTO(data));
  readAll = async (filter) => await this.manager.readAll(filter);
  readById = async (id) => await this.manager.readById(id);
  readBy = async (filter) => await this.manager.readBy(filter);
  updateById = async (id, data) => await this.manager.updateById(id, data);
  destroyById = async (id) => await this.manager.destroyById(id);
  destroyAll = async (filter) => await this.manager.destroyAll(filter);
}

const cartsRepository = new CartsRepository();
export default cartsRepository;
