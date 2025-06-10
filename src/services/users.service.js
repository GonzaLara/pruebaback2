import { usersManager } from "../data/manager.mongo.js";

class UsersService {
  constructor() {
    this.manager = usersManager;
  }
  createOne = async (data) => await usersManager.createOne(data);
  readAll = async (filter) => await usersManager.readAll(filter);
  readById = async (id) => await usersManager.readById(id);
  updateById = async (id, data) => await usersManager.updateById(id);
  destroyById = async (id) => await usersManager.destroyById(id);
}

const usersService = new UsersService();
export default usersService;
