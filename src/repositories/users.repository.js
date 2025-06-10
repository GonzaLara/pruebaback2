import { usersManager } from "../dao/factory.js";
import UsersDTO from "../dto/users.dto.js";

class UsersRepository {
  constructor() {
    this.manager = usersManager;
  }
  createOne = async (data) => await usersManager.createOne(new UsersDTO(data));
  readAll = async (filter) => await usersManager.readAll(filter);
  readById = async (id) => await usersManager.readById(id);
  readBy = async (filter) => await usersManager.readBy(filter);
  updateById = async (id, data) => await usersManager.updateById(id, data);
  destroyById = async (id) => await usersManager.destroyById(id);
}

const usersRepository = new UsersRepository();
export default usersRepository;
