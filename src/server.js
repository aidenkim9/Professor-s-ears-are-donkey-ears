import "./db";
import "./models/Message";
import "./models/User";
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import messageRouter from "./routers/messageRouter";
import path from "path";

const app = express();
const logger = morgan("dev");

const PORT = 4000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use("/", globalRouter);
app.use("/message", messageRouter);

app.listen(PORT, () =>
  console.log(`✅ Server is listening http://localhost:${PORT} 🚀`)
);
