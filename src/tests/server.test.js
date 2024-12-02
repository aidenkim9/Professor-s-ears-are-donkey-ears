import request from "supertest";
import mongoose from "mongoose";
import User from "../models/User";
import Message from "../models/Message";
import app from "../server";

describe("End-to-End Tests", () => {
  it("should allow a user to sign up, log in, and view messages", async () => {
    // 회원가입 요청
    const signupRes = await request(app).post("/join").send({
      email: "test@example.com",
      user_id: 112233,
      password: "123456",
      password2: "123456", // 비밀번호 확인 필드
    });

    console.log("Signup Response:", signupRes.statusCode, signupRes.body); // 디버깅 로그 추가
    expect(signupRes.statusCode).toBe(302); // 성공 시 리다이렉션 확인

    // 데이터베이스에서 사용자 확인
    const user = await User.findOne({ email: "test@example.com" });
    console.log("User in DB:", user); // 디버깅 로그 추가
    expect(user).toBeDefined();

    // 로그인 요청
    const loginRes = await request(app).post("/login").send({
      email: "test@example.com",
      password: "123456",
    });

    console.log("Login Response:", loginRes.statusCode, loginRes.body); // 디버깅 로그 추가
    expect(loginRes.statusCode).toBe(302);

    // 메시지 작성 요청
    const messageRes = await request(app).post("/message/write").send({
      stu_id: 123,
      pro_id: 456,
      title: "New Message",
      message: "Hello World",
    });

    console.log("Message Response:", messageRes.statusCode, messageRes.body);
    expect(messageRes.statusCode).toBe(302);

    // 데이터베이스에서 메시지 확인
    const savedMessage = await Message.findOne({ title: "New Message" });
    console.log(savedMessage);
    expect(savedMessage).toBeDefined();
    expect(savedMessage.message).toBe("Hello World");

    // 메시지 확인 요청
    const messagesRes = await request(app).get("/");
    console.log("Messages Response Text:", messagesRes.text); // 디버깅 로그
    expect(messagesRes.text).toContain("New Message");
  });
});
