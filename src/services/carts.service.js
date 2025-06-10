import cartsRepository from "../repositories/carts.repository";

class CartsService {
  constructor() {
    this.repository = cartsRepository;
  }
  createOne = async (data) => await this.repository.createOne(data);
  readAll = async (filter) => await this.repository.readAll(filter);
  readById = async (id) => await this.repository.readById(id);
  updateById = async (id, data) => await this.repository.updateById(id, data);
  destroyById = async (id) => await this.repository.destroyById(id);
  destroyAll = async (filter) => await this.repository.destroyAll(filter);
}

const cartsService = new CartsService();
export default cartsService;
