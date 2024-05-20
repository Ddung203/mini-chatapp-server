import { User } from "../entity/User.js";
import { Conversation } from "../entity/Conversation.js";
import { Message } from "../entity/Message.js";

const dataSourceConfig = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "atbm",
  synchronize: true,
  entities: [User, Conversation, Message],
};

export default dataSourceConfig;
