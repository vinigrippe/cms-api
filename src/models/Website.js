const connect = require("../utils/connection.js");

class Website {
  constructor({ id, title, icon, status, userCreator }) {
    this.id = id;
    this.title = title;
    this.icon = icon;
    this.status = status;
    this.userCreator = userCreator;
  }
}

Website.create = async (req, result) => {
  const query =
    "INSERT INTO websites (title, icon, status, userCreator) VALUES (?, ?, ?, ?)";
  const values = [req.title, req.icon, req.status, req.userCreator];

  connect.query(query, values, (error, res) => {
    if (error) {
      return result(501, { message: "Something got wrong", error });
    }

    return result(200, { message: "Website created successfully", res });
  });
};

Website.updateById = async (req, result) => {
  let query =
    "UPDATE websites SET title = COALESCE(?, title), icon = COALESCE(?, icon), status = COALESCE(?, status), userCreator = COALESCE(?, userCreator) WHERE id = ?";
  let values = [
    req.title ? req.title : null,
    req.icon ? req.icon : null,
    req.status ? req.status : null,
    req.userCreator ? req.userCreator : null,
    req.id,
  ];

  connect.query(query, values, (error, res) => {
    if (error) {
      return result(501, { message: "Something got wrong", error });
    }

    return result(200, {
      message: "Website updated successfully",
    });
  });
};

Website.createHistory = async (req, result) => {
  const query =
    "INSERT INTO websites_history (websiteId, userId, title, icon, status) VALUES (?, ?, ?, ?, ?)";
  const values = [req.id, req.userId, req.title, req.icon, req.status];

  connect.query(query, values, (error, res) => {
    if (error) {
      return result(501, { message: "Something got wrong", error });
    }

    const website = res[0];
    return result(200, {
      message: "Website history created successfully",
      website,
    });
  });
};

Website.findById = async (req, result) => {
  const query = "SELECT * FROM websites WHERE id = ?";

  connect.query(query, req.id, (error, res) => {
    if (error) {
      return result(501, { message: "Something got wrong", error });
    }

    const website = res[0];
    return result(200, website);
  });
};

Website.findHistoryById = async (req, result) => {
  const query = "SELECT * FROM websites_history WHERE websiteId = ?";

  connect.query(query, req.id, (error, res) => {
    if (error) {
      return result(501, { message: "Something got wrong", error });
    }

    return result(200, res);
  });
};

Website.findAll = (_, result) => {
  const query = "SELECT * FROM websites";
  const values = [];

  connect.query(query, values, (error, res) => {
    if (error) {
      return result(501, { message: "Something got wrong", error });
    }

    return result(200, res);
  });
};

Website.deleteById = async (req, result) => {
  const query = "DELETE FROM websites WHERE id = ?";

  connect.query(query, req.id, (error) => {
    if (error) {
      return result(501, { message: "Something got wrong", error });
    }

    return result(200, { message: "Website deleted successfully" });
  });
};

module.exports = Website;
