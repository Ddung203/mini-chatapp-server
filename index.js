import app from "./src/app.js";
import { initializeDataSource } from "./src/config/dataSource.js";
import * as dotenv from "dotenv";
dotenv.config();

app.listen(process.env.PORT, async () => {
  await initializeDataSource();
  console.log("Server is listening on http://localhost:" + process.env.PORT);
});
