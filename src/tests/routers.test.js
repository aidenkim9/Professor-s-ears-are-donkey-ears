import request from "supertest";
import app from "../server";

describe("Global Router", () => {
  it("should render home page", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("Home");
  });

  it("should render login page", async () => {
    const res = await request(app).get("/login");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("Login");
  });
});
