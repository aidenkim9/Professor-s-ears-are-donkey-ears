import User from "../models/User";
import Message from "../models/Message";
import bycrpt from "bcrypt";

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });
export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "There is no account.",
    });
  }
  const ok = await bycrpt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "Wrong password.",
    });
  }
  const messages = await Message.find({ pro_id: user.user_id });
  req.session.loggedIn = true;
  req.session.user = user;
  req.session.messages = messages;
  return res.redirect("/");
};
export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const { email, user_id, password, password2 } = req.body;
  console.log("Received data: ", email, user_id, password, password2);
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "Password check failed.",
    });
  }
  const emailExists = await User.exists({ email });
  if (emailExists) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "Email already taken.",
    });
  }
  const userIdExists = await User.exists({ user_id });
  if (userIdExists) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "User Id already taken.",
    });
  }
  try {
    await User.create({
      email,
      user_id,
      password,
    });
    return res.redirect("/login");
  } catch (error) {
    console.log("JOIN ERROR: ", error.message);
    return res.render("join", { pageTitle: "Join" });
  }
};
export const search = (req, res) => res.render("search");
export const menu = (req, res) => res.render("menu");
