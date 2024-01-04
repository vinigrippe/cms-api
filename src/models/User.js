const connect = require("../utils/connection.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class User {
  constructor({ id, name, email, avatar, username, password }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.avatar = avatar;
    this.name = name;
    this.password = password;
  }
}

User.create = async (req, result) => {
  const query =
    "INSERT INTO users (name, email, avatar, username, password) VALUES (?, ?, ?, ?, ?)";
  const values = [req.name, req.email, req.avatar, req.username, req.password];

  connect.query(query, values, (error, res) => {
    if (error) {
      return result(501, { message: "Something got wrong", error });
    }

    const user = res[0];
    return result(200, { message: "User created successfully", user });
  });
};

User.login = async (req, result) => {
  const query = "SELECT * FROM users WHERE username = ?";
  const values = [req.username];

  connect.query(query, values, async (error, res) => {
    if (error || res.length === 0) {
      return result(501, { message: "Something got wrong", error });
    }

    const user = res[0];
    const hashedPassword = user.password;
    const comparePassword = await bcrypt.compare(req.password, hashedPassword);

    if (!comparePassword) {
      return result(501, { message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { username: req.username },
      process.env.SECRET_KEY,
      {}
    );

    const query = "INSERT INTO tokens (userId, token) VALUES (?, ?)";
    const values = [user.id, token];

    connect.query(query, values, (error) => {
      if (error) {
        return result(501, { message: "Something got wrong", error });
      }

      return result(200, { message: "Login successful", user, token });
    });
  });
};

User.logout = async (req, result) => {
  const query = "DELETE FROM tokens WHERE token = ?";

  if (!req) return result(401, { message: "Token not provided" });

  connect.query(query, req, (error) => {
    if (error) {
      return result(500, { message: "Internal Server Error" });
    } else {
      return result(200, { message: "Logout successful" });
    }
  });
};

User.findById = (req, result) => {
  const query = "SELECT * FROM users WHERE id = ?";
  const values = [req.id];

  connect.query(query, values, (error, res) => {
    if (error) {
      return result(501, { message: "Something got wrong", error });
    }

    const user = res[0];
    return result(200, user);
  });
};

User.findAll = (_, result) => {
  const query = "SELECT * FROM users";
  const values = [];

  connect.query(query, values, (error, res) => {
    if (error) {
      return result(501, { message: "Something got wrong", error });
    }

    return result(200, res);
  });
};

User.delete = (req, result) => {
  const query = "DELETE FROM users WHERE id = ?";

  connect.query(query, req.id, (error) => {
    if (error) {
      return result(501, { message: "Something got wrong", error });
    }

    return result(200, {
      message: "User deleted successfully",
    });
  });
};

module.exports = User;
