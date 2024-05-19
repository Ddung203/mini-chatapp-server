import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import corsOptions from "./config/cors.config.js";
import router from "./routes/index.js";

const app = express();

app.use(helmet());
app.use(compression());
app.use(cors(corsOptions));
app.use(morgan("dev"));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/", router);

export default app;
