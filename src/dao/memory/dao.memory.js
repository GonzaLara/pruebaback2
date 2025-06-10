class DaoMemory {
  constructor() {
    createOne = async(data) => {
      /* logica para crear uno en la memoria */
    };
    readAll = async(filter) => {
      /* logica para leer todos o filtrar en la memoria */
    };
    readBy = async(data) => {
      /* logica para leer uno en la memoria */
    };
    readById = async(id) => {
      /* logica para leer por id de la memoria */
    };
    updateById = async(id, data) => {
      /* logica para actualizar uno en la memoria */
    };
    destroyById = async(id) => {
      /* logica para eliminar uno en la memoria */
    };
  }
}

const usersManager = new DaoMemory();
const productsManager = new DaoMemory();
const cartsManager = new DaoMemory();

export { usersManager, productsManager, cartsManager };