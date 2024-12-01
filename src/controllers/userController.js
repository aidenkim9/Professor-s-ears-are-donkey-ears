import User from "../models/User";

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });
export const postLogin = (req, res) => {
  return res.redirect("/");
};
export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const { email, user_id, password } = req.body;
  try {
    await User.create({
      email,
      user_id,
      password,
    });
    return res.redirect("/login");
  } catch {
    console.log("JOIN ERROR");
    return res.render("join", { pageTitle: "Join" });
  }
};
export const search = (req, res) => res.render("search");
export const menu = (req, res) => res.render("menu");
