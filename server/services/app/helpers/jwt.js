const jwt = require("jsonwebtoken");

function signToken(payload) {
  return jwt.sign(payload, "Rahasia");
}

function verifyToken(token) {
  return jwt.verify(token, "Rahasia");
}

module.exports = {
    signToken,
    verifyToken
};
