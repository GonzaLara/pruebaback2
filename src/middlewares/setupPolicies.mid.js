import { usersManager } from "../data/manager.mongo.js";
import { verifyToken } from "../helpers/token.util.js";


const setupPolicies = (policies) => async (req, res, next) => {
  try {
    if (policies.includes("PUBLIC")) return next();

    const token = req?.signedCookies?.token;
    if (!token) return res.json401("Token ausente");

    let data;
    try {
      data = verifyToken(token);
    } catch (err) {
      return res.json401("Token invalido");
    }

    const { _id, role } = data;
    if (!_id) return res.json401("Token sin ID");

    const roles = {
      USER: policies.includes("USER"),
      ADMIN: policies.includes("ADMIN"),
    };

    const verifyRole = roles[role];
    if (!verifyRole) return res.json403("No autorizado");

    const user = await usersManager.readById(_id);
    if (!user) return res.json401("Usuario no encontrado");

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default setupPolicies;