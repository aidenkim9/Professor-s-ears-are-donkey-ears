import express from "express";
import {
  getLogin,
  menu,
  postLogin,
  search,
  getJoin,
  postJoin,
} from "../controllers/userController";
import { home } from "../controllers/messageController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/login", getLogin);
globalRouter.post("/login", postLogin);
globalRouter.get("/join", getJoin);
globalRouter.post("/join", postJoin);
globalRouter.get("/search", search);
globalRouter.get("/menu", menu);

export default globalRouter;
