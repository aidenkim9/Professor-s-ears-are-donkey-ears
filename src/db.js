import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/donkeyears");

const db = mongoose.connection;

const handleError = (error) => console.log("Connection Error", error);
const handleOpen = () => console.log("✅ Connection to DB");

db.on("error", handleError);
db.once("open", handleOpen);
