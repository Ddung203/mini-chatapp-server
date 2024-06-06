export default {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "atbm_2",
  synchronize: true,
  entities: ["src/entity/*.js"],
};
