import dbConnect from "../helpers/dbConnect.helper.js";
const { PERSISTENCE, URL_MONGO } = process.env;

let dao = {};

switch (PERSISTENCE) {
  case "memory":
    {
      console.log("conectado a memory");
      const { usersManager, productsManager, cartsManager } = await import(
        "./memory/dao.memory.js"
      );
      dao = { usersManager, productsManager, cartsManager };
    }
    break;

  case "fs":
    {
      console.log("conectado a fs");
      const { usersManager, productsManager, cartsManager } = await import(
        "./fs/dao.fs.js"
      );
      dao = { usersManager, productsManager, cartsManager };
    }
    break;
  default:
    {
      await dbConnect(URL_MONGO);
      const { usersManager, productsManager, cartsManager } = await import(
        "./mongo/dao.mongo.js"
      );
      dao = { usersManager, productsManager, cartsManager };
    }
    break;
}

const { usersManager, productsManager, cartsManager } = dao;
export { usersManager, productsManager, cartsManager };
export default dao;
