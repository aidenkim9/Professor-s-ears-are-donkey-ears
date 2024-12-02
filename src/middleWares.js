export const middleWares = (req, res, next) => {
  if (req.session.loggedIn === true) {
    res.locals.loggedIn = true;
  }
  res.locals.loggedInUser = req.session.user;
  res.locals.messages = req.session.messages;
  console.log(req.session);
  next();
};
