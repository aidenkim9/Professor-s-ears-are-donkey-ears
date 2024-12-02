import mongoose from "mongoose";

if (process.env.NODE_ENV !== "test") {
  mongoose.connect("mongodb://127.0.0.1:27017/donkeyears");
}

//테스트 진행할 때만, 조건문 사용

const db = mongoose.connection;

const handleError = (error) => console.log("Connection Error", error);
const handleOpen = () => console.log("✅ Connection to DB");

db.on("error", handleError);
db.once("open", handleOpen);
