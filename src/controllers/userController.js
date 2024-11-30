export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });
export const postLogin = (req, res) => {
  return res.redirect("/");
};
export const search = (req, res) => res.render("search");
export const menu = (req, res) => res.render("menu");
