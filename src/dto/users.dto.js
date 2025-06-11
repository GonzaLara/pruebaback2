import crypto from "crypto";
import { createHash } from "../helpers/hash.util.js";

const { PERSISTENCE } = process.env;

class UsersDTO {
  constructor(data) {
    if (PERSISTENCE != "mongo") {
      this._id = crypto.randomBytes(12).toString("hex");
    }
    this.name = data.name;
    this.date = data.date;
    this.city = data.city;
    this.email = data.email;
    this.password = createHash(data.password);
    this.avatar = data.avatar;
    this.role = data.role || "USER";
    // Esto es nuevo
    this.isVerified = data.isVerified || false;
    // 
    this.verifyCode = data.verifyCode || crypto.randomBytes(12).toString("hex");
    if (PERSISTENCE != "mongo") {
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
}

export default UsersDTO;