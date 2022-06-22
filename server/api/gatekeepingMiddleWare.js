const User = require("../db/models/User");

// const {
//   models: { User },
// } = require("../db");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.body.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

const requireTokenForPutAndPostMethods = async (req, res, next) => {
  try {
    const token = req.body.authorization;
    const user = await User.findByToken(token);
    req.body.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

const isUserAdmin = function (req, res, next) {
  try {
    if (!req.body.user.isAdmin) {
      res.status(200).send("You are not an authorized user!");
      return;
    }
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  requireToken,
  requireTokenForPutAndPostMethods,
  isUserAdmin,
};
