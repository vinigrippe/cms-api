const connect = require("../utils/connection.js");

class Style {
  constructor({ id, designId, name, styleHover, styleInline }) {
    this.id = id;
    this.name = name;
    this.designId = designId;
    this.styleInline = styleInline;
    this.styleHover = styleHover;
  }
}

Style.create = (req, result) => {
  const query =
    "INSERT INTO styles (name, designId, styleInline, styleHover) VALUES (?, ?, ?, ?)";
  const values = [
    req.name,
    req.designId,
    JSON.stringify(req.styleInline),
    JSON.stringify(req.styleHover),
  ];

  connect.query(query, values, (error, res) => {
    if (error) {
      return result(501, { message: "Something got wrong", error });
    }

    return result(200, { message: "Style created successfully" });
  });
};

Style.updateById = (req, result) => {
  let query =
    "UPDATE styles SET styleInline = COALESCE(?, styleInline), name = COALESCE(?, name), designId = COALESCE(?, designId), styleHover = COALESCE(?, styleHover) WHERE id = ?";
  let values = [
    req.styleInline && !isNaN(req.styleInline)
      ? JSON.stringify(req.styleInline)
      : null,
    req.name ? req.name : null,
    req.designId ? req.designId : null,
    req.styleHover && !isNaN(req.styleHover)
      ? JSON.stringify(req.styleHover)
      : null,
    req.id,
  ];

  connect.query(query, values, (error, res) => {
    if (error) {
      return result(501, { message: "Something got wrong", error });
    }

    return result(200, {
      message: "Style updated successfully",
    });
  });
};

Style.findAll = (_, result) => {
  const query = "SELECT * FROM styles";
  const values = [];

  connect.query(query, values, (error, res) => {
    if (error) {
      return result(501, { message: "Something got wrong", error });
    }

    return result(200, res);
  });
};

Style.findByDesignId = (req, result) => {
  const query = "SELECT * FROM styles WHERE designId = ?";

  connect.query(query, req.id, (error, res) => {
    if (error) {
      return result(501, { message: "Something got wrong", error });
    }

    return result(200, res);
  });
};

Style.deleteById = (req, result) => {
  const query = "DELETE FROM styles WHERE id = ?";

  connect.query(query, req.id, (error) => {
    if (error) {
      return result(501, { message: "Something got wrong", error });
    }

    return result(200, { message: "Style deleted successfully" });
  });
};

module.exports = Style;
