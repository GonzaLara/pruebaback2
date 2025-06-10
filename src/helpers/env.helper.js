import { config } from "dotenv";
import argsHelper from "./args.helper.js";

const path = ".env." + argsHelper.mode;
config({ path });
