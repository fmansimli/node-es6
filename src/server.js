import express from "express";
import http from "http";

//import routes and controllers
import { get404, handleError } from "./controllers/errors";
import auth from "./routes/auth";

const app = express();
const httpServer = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", auth);

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "everything is ok..." });
});

app.use(get404);
app.use(handleError);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`*** server is running on http://localhost:${PORT}`);
});
