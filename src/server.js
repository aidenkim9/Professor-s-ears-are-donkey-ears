import "dotenv/config";
import "./db";
import "./models/Message";
import "./models/User";
import express from "express";
import morgan from "morgan";
import session from "express-session";
import { middleWares } from "./middleWares";
import globalRouter from "./routers/globalRouter";
import messageRouter from "./routers/messageRouter";
import path from "path";

const app = express();
const logger = morgan("dev");

const PORT = 4000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);

app.use(
  session({
    secret: "hello",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(middleWares);

app.use("/", globalRouter);
app.use("/message", messageRouter);

if (require.main === module) {
  app.listen(PORT, () =>
    console.log(`✅ Server is listening http://localhost:${PORT} 🚀`)
  );
}

export default app;
