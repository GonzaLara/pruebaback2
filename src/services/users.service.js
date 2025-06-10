import usersRepository from "../repositories/users.repository.js";

class UsersService {
  constructor() {
    this.repository = usersRepository;
  } 
  createOne = async (data) => await this.repository.createOne(data);
  readAll = async (filter) => await this.repository.readAll(filter);
  readById = async (id) => await this.repository.readById(id);
  updateById = async (id, data) => await this.repository.updateById(id);
  destroyById = async (id) => await this.repository.destroyById(id);
}

const usersService = new UsersService();
export default usersService;
