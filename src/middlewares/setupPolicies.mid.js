import { usersManager } from "../data/manager.mongo.js";
import { verifyToken } from "../helpers/token.util.js";

const setupPolicies = (policies) => async (req, res, next) => {
  try {
    if (policies.includes("PUBLIC")) return next();
    const token = req?.signedCookies?.token;
    const data = verifyToken(token);
    const { user_id, role } = data;
    if (!user_id) return res.json401();
    const roles = {
      USER: policies.includes("USER"),
      ADMIN: policies.includes("ADMIN"),
    };
    const verifyRole = roles[role];
    if (!verifyRole) return res.json403();
    const user = await usersManager.readById(user_id);
    const { password, createdAt, updatedAt, __v, ...rest } = user;
    res.json200(rest);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default setupPolicies;