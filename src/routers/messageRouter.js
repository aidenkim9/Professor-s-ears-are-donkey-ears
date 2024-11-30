import express from "express";
import {
  getWrite,
  view,
  postWrite,
  edit,
} from "../controllers/messageController";

const messageRouter = express.Router();

messageRouter.get("/write", getWrite);
messageRouter.post("/write", postWrite);
messageRouter.get("/:id([0-9a-f]{24})", view);
messageRouter.get("/edit", edit);

export default messageRouter;
