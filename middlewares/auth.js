const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) {
      throw "not token";
    }
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;
    const decoded = jwt.verify(tokenWithoutBearer, config.secretJwtToken);
    req.user = decoded;
    next();
  } catch (message) {
    next(new UnauthorizedError(message));
  }
};
