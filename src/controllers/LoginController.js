const User = require("../models/User.js");

exports.token = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  User.checkToken(token, (status, data) => {
    return res.status(status).send(data);
  });
};

exports.login = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({
      message: "Username and password are required!",
    });
  }

  const userReq = new User({
    username: req.body.username,
    password: req.body.password,
  });

  User.login(userReq, (status, data) => {
    return res.status(status).send(data);
  });
};

exports.logout = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  User.logout(token, (status, data) => {
    return res.status(status).send(data);
  });
};
