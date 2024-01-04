const connect = require("../utils/connection");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Token not provided" });

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    const query = "SELECT * FROM tokens WHERE token = ?";
    const values = [token];

    connect.query(query, values, (error, results) => {
      if (error) {
        return res.status(401).json({ message: "Something got wrong" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid token" });
      }
      req.user = user;
      next();
    });
  });
};

module.exports = { verifyToken };
