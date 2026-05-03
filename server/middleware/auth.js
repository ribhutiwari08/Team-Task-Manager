
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).send("No token");

  const decoded = jwt.verify(token, process.env.ribhu12345);
  req.user = decoded;

  next();
};