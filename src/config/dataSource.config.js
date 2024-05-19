import { User } from "../entity/User.js";

const dataSourceConfig = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "atbm",
  synchronize: true,
  entities: [User],
};

export default dataSourceConfig;
