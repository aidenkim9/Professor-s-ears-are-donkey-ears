import { getLogin, postLogin } from "../controllers/userController";
import User from "../models/User";

jest.mock("../models/User"); // User 모델을 모킹

describe("User Controller", () => {
  it("should render login page", () => {
    const req = {};
    const res = { render: jest.fn() };

    getLogin(req, res);
    expect(res.render).toHaveBeenCalledWith("login", { pageTitle: "Login" });
  });

  it("should return error if user does not exist", async () => {
    User.findOne.mockResolvedValue(null);
    const req = { body: { email: "test@example.com", password: "123456" } };
    const res = { status: jest.fn().mockReturnThis(), render: jest.fn() };

    await postLogin(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.render).toHaveBeenCalledWith("login", {
      pageTitle: "Login",
      errorMessage: "There is no account.",
    });
  });
});
