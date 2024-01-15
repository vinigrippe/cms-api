const connect = require("../utils/connection.js");

class Design {
  constructor({ id, name, element, pageId }) {
    this.id = id;
    this.name = name;
    this.element = element;
    this.pageId = pageId;
  }
}

Design.create = (req, result) => {
  const query = "INSERT INTO design (element, name, pageId) VALUES (?, ?, ?)";
  const values = [req.element, req.name, req.pageId];

  connect.query(query, values, (error) => {
    if (error) {
      return result(501, { message: "Something got wrong", error });
    }

    return result(200, { message: "Design created successfully" });
  });
};

Design.updateById = (req, result) => {
  let query =
    "UPDATE design SET name = COALESCE(?, name), element = COALESCE(?, element), pageId = COALESCE(?, pageId) WHERE id = ?";
  let values = [
    req.name ? req.name : null,
    req.element ? req.element : null,
    req.id,
    req.pageId ? req.pageId : null,
  ];

  connect.query(query, values, (error, res) => {
    if (error) {
      return result(501, { message: "Something got wrong", error });
    }

    return result(200, {
      message: "Design updated successfully",
    });
  });
};

Design.findAll = (req, result) => {
  const query = "SELECT * FROM design WHERE pageId = ?";

  connect.query(query, req.pageId, (error, res) => {
    if (error) {
      result(501, { message: "Something got wrong", error });
    }

    result(200, res);
  });
};

Design.deleteById = (req, result) => {
  const query = "DELETE FROM design WHERE id = ?";

  connect.query(query, req.id, (error) => {
    if (error) {
      return result(501, { message: "Something got wrong", error });
    }

    return result(200, { message: "Design deleted successfully" });
  });
};

module.exports = Design;
