const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (!authHeader) return res.status(500).send("acces denied no token");

  // splitting and verifying token

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.TOKEN_PASS, (err, user) => {
    if (err) {
      return res.status(500).send("token is incorrect");
    } else {
      req.user = user;
      next();
    }
  });
};

const verifyTokenAndAthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("you're not allowed to something like that");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("you're not an admin");
    }
  });
};

module.exports.verifyToken = verifyToken;
module.exports.verifyTokenAndAthorization = verifyTokenAndAthorization;
module.exports.verifyTokenAndAdmin = verifyTokenAndAdmin;
