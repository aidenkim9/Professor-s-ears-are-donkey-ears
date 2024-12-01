import mongoose from "mongoose";
import Filter from "badwords-ko";
const filter = new Filter();

const messageSchema = new mongoose.Schema({
  stu_id: { type: Number, required: true, trim: true },
  pro_id: { type: Number, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  date: { type: Date, required: true, trim: true, default: Date.now },
  message: { type: String, required: true, trim: true },
});

messageSchema.pre("save", async function () {
  if (this.message) {
    this.message = filter.clean(this.message);
  }
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
