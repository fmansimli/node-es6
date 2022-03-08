import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { join } from "path";

// routes and controllers
import indexRouter from "routes/index";
import { get404, handleError } from "controllers/errors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));

app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  cors({
    origin: [process.env.CORS_ORIGIN],
    optionsSuccessStatus: 200,
  })
);

app.use("/api", indexRouter);
app.use(get404);
app.use(handleError);

export default app;
