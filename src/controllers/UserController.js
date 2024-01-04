const User = require("../models/User.js");
const bcrypt = require("bcrypt");

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const userReq = new User({
    name: req.body.name,
    email: req.body.email,
    avatar: req.body.avatar,
    username: req.body.username,
    password: hashedPassword,
  });

  User.create(userReq, (status, data) => {
    res.status(status).send(data);
  });
};

exports.get = (req, res) => {
  const userReq = new User({
    id: req.params.id,
  });

  User.findById(userReq, (status, data) => {
    res.status(status).send(data);
  });
};

exports.getAll = (_, res) => {
  User.findAll(_, (status, data) => {
    res.status(status).send(data);
  });
};

exports.delete = (req, res) => {
  const userReq = new User({
    id: req.params.id,
  });

  User.remove(userReq, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "User not found with id " + userReq.id,
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + userReq.id,
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};
