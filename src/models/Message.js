import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  stu_id: Number,
  pro_id: Number,
  title: String,
  date: Date,
  message: String,
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
