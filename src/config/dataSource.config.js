import { User } from "../entity/User.js";
import { Conversation } from "../entity/Conversation.js";
import { Message } from "../entity/Message.js";
import { Key } from "../entity/Key.js";

const dataSourceConfig = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "atbm_2",
  synchronize: true,
  entities: [User, Conversation, Message, Key],
};

export default dataSourceConfig;
