import request from "supertest";
import User from "../models/User";
import Message from "../models/Message";
import app from "../server";

describe("End-to-End Tests", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await Message.deleteMany({});
  });

  it("should allow a user to sign up, log in, write a message, and view it", async () => {
    // 회원가입 요청
    await request(app).post("/join").send({
      email: "test@example.com",
      user_id: 112233,
      password: "123456",
      password2: "123456",
    });

    // 비밀번호 불일치
    await request(app)
      .post("/join")
      .send({
        email: "mismatch@example.com",
        user_id: 778899,
        password: "123456",
        password2: "654321",
      })
      .expect(400);

    // 로그인 요청
    await request(app).post("/login").send({
      email: "test@example.com",
      password: "123456",
    });

    // 존재하지 않는 사용자 로그인
    await request(app)
      .post("/login")
      .send({
        email: "nonexistent@example.com",
        password: "wrongpassword",
      })
      .expect(400);
    await request(app)
      .post("/login")
      .send({
        email: "test@example.com",
        password: "wrongpassword",
      })
      .expect(400);

    // 메시지 작성 요청
    await request(app).post("/message/write").send({
      stu_id: 123,
      pro_id: 112233,
      title: "Test Message",
      message: "This is test message.",
    });

    // 홈 화면에서 메시지 확인
    const homeRes = await request(app).get("/");
    console.log(homeRes.text); // 출력된 HTML 확인

    // 정규식으로 <li> 태그와 링크 확인
    expect(homeRes.text).toMatch(
      /<li.*?>.*?<a href="message\/[a-f0-9]+">Test Message<\/a>.*?<\/li>/
    );
  });
});
