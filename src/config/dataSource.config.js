import * as dotenv from "dotenv";
import { User } from "../entity/User.js";
import { Conversation } from "../entity/Conversation.js";
import { Message } from "../entity/Message.js";
import { Key } from "../entity/Key.js";

dotenv.config();

const dataSourceConfig = {
  type: process.env.LOCAL_MYSQL_TYPE || "mysql",
  host: process.env.LOCAL_MYSQL_HOST || "localhost",
  port: process.env.LOCAL_MYSQL_PORT || 3306,
  username: process.env.LOCAL_MYSQL_USERNAME || "root",
  password: process.env.LOCAL_MYSQL_PASSWORD || "",
  database: process.env.LOCAL_MYSQL_DATABASE || "atbm_2",
  synchronize: process.env.LOCAL_MYSQL_SYNCHRONIZE || true,
  entities: [User, Conversation, Message, Key],
};

export default dataSourceConfig;
