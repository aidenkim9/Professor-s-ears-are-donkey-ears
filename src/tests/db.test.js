import mongoose from "mongoose";
describe("Database Connection", () => {
  it("should connect to MongoDB", async () => {
    const state = mongoose.connection.readyState;
    expect(state).toBe(1);
  });
});
