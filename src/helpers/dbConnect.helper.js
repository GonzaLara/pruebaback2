import { connect } from "mongoose";

const dbConnect = async (url) => {
  try {
    await connect(url);
    console.log("Conectado a base de datos mongo.");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
