import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  // 기존 연결이 있다면 종료
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  // 메모리 서버에 연결
  await mongoose.connect(uri);
  console.log("✅ Connected to in-memory MongoDB");
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  console.log("✅ MongoDB memory server stopped");
});
