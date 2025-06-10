class DaoFs {
  constructor() {
    createOne = async(data) => {
      /* logica para crear uno en fs */
    };
    readAll = async(filter) => {
      /* logica para leer todos o filtrar en fs */
    };
    readBy = async(data) => {
      /* logica para leer uno en fs */
    };
    readById = async(id) => {
      /* logica para leer por id de fs */
    };
    updateById = async(id, data) => {
      /* logica para actualizar uno en fs */
    };
    destroyById = async(id) => {
      /* logica para eliminar uno en fs */
    };
  }
}

const usersManager = new DaoFs();
const productsManager = new DaoFs();
const cartsManager = new DaoFs();

export { usersManager, productsManager, cartsManager };