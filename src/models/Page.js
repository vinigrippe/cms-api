const connect = require("../utils/connection.js");

class Page {
  constructor({
    id,
    title,
    url,
    userCreator,
    userId,
    status,
    elements,
    websiteId,
  }) {
    this.id = id;
    this.status = status;
    this.url = url;
    this.userCreator = userCreator;
    this.userId = userId;
    this.title = title;
    this.elements = elements;
    this.websiteId = websiteId;
  }
}

Page.create = async (req, result) => {
  const query =
    "INSERT INTO pages (title, elements, url, status, userCreator, websiteId) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [
    req.title,
    JSON.stringify(req.elements),
    req.url,
    req.status,
    req.userCreator,
    req.websiteId,
  ];

  connect.query(query, values, (error, res) => {
    if (error) {
      return result(501, { message: "Something got wrong", error });
    }

    return result(200, { message: "Page created successfully", res });
  });
};

Page.updateById = async (req, result) => {
  let query =
    "UPDATE pages SET elements = ?, title = COALESCE(?, title), url = COALESCE(?, url), status = COALESCE(?, status) WHERE id = ?";
  let values = [
    JSON.stringify(req.elements),
    req.title ? req.title : null,
    req.url ? req.url : null,
    req.status ? req.status : null,
    req.id,
  ];

  connect.query(query, values, (error, res) => {
    if (error) {
      return result(501, { message: "Something got wrong", error });
    }

    return result(200, {
      message: "Page updated successfully",
    });
  });
};

Page.createHistory = async (req, result) => {
  const query =
    "INSERT INTO pages_history (pageId, userId, title, elements, status, url) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [
    req.id,
    req.userId,
    req.title,
    JSON.stringify(req.elements),
    req.status,
    req.url,
  ];

  connect.query(query, values, (error, res) => {
    if (error) {
      return result(501, { message: "Something got wrong", error });
    }

    const page = res[0];
    return result(200, { message: "Page history created successfully", page });
  });
};

Page.findById = async (req, result) => {
  const query = "SELECT * FROM pages WHERE id = ?";

  connect.query(query, req.id, (error, res) => {
    if (error) {
      return result(501, { message: "Something got wrong", error });
    }

    const page = res[0];
    return result(200, page);
  });
};

Page.findHistoryById = async (req, result) => {
  const query = "SELECT * FROM pages_history WHERE pageId = ?";

  connect.query(query, req.id, (error, res) => {
    if (error) {
      return result(501, { message: "Something got wrong", error });
    }

    return result(200, res);
  });
};

Page.findAll = (req, result) => {
  const query =
    "SELECT id, title, url, userCreator, status, creationDate, updateDate FROM pages WHERE websiteId = ? ORDER BY creationDate DESC";

  connect.query(query, req.websiteId, (error, res) => {
    if (error) {
      return result(501, { message: "Something got wrong", error });
    }

    return result(200, res);
  });
};

Page.deleteById = async (req, result) => {
  const query = "DELETE FROM pages WHERE id = ?";

  connect.query(query, req.id, (error) => {
    if (error) {
      return result(501, { message: "Something got wrong", error });
    }

    return result(200, { message: "Page deleted successfully" });
  });
};

module.exports = Page;
