import * as dotenv from "dotenv";
import { User } from "../entity/User.js";
import { Conversation } from "../entity/Conversation.js";
import { Message } from "../entity/Message.js";
import { Key } from "../entity/Key.js";

dotenv.config();

let dataSourceConfig = {
  type: process.env.LOCAL_MYSQL_TYPE || "mysql",
  host: process.env.LOCAL_MYSQL_HOST || "localhost",
  port: process.env.LOCAL_MYSQL_PORT || 3306,
  username: process.env.LOCAL_MYSQL_USERNAME || "root",
  password: process.env.LOCAL_MYSQL_PASSWORD || "",
  database: process.env.LOCAL_MYSQL_DATABASE || "atbm_2",
  synchronize: process.env.LOCAL_MYSQL_SYNCHRONIZE || true,
  entities: [User, Conversation, Message, Key],
};

if (process.env.NODE_ENV === "production") {
  dataSourceConfig = {
    type: process.env.MYSQL_TYPE || "mysql",
    host: process.env.MYSQL_HOST || "localhost",
    port: process.env.MYSQL_PORT || 3306,
    username: process.env.MYSQL_USERNAME || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "atbm_2",
    synchronize: process.env.MYSQL_SYNCHRONIZE || true,
    entities: [User, Conversation, Message, Key],
  };
}
export default dataSourceConfig;
