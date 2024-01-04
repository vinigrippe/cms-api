const connect = require("../utils/connection.js");

class DesignSystem {
  constructor({ id, element, styleId, style, styleName, type, typeName }) {
    this.id = id;
    this.type = type;
    this.typeName = typeName;
    this.styleId = styleId;
    this.styleName = styleName;
    this.style = style;
    this.element = element;
  }
}

DesignSystem.create = (req, result) => {
  const query =
    "INSERT INTO design_system (element, style_id, style, type, type_name, style_name) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [
    req.element,
    req.styleId,
    JSON.stringify(req.style),
    req.type,
    req.typeName,
    req.styleName,
  ];

  connect.query(query, values, (error, res) => {
    if (error) {
      return result(501, { message: "Something got wrong", error });
    }

    return result(200, { message: "DesignSystem created successfully" });
  });
};

DesignSystem.updateById = (req, result) => {
  let query =
    "UPDATE design_system SET style = COALESCE(?, style), type_name = COALESCE(?, type_name), type = COALESCE(?, type), style_id = COALESCE(?, style_id), style_name = COALESCE(?, style_name) WHERE id = ?";
  let values = [
    req.style && !isNaN(req.style) ? JSON.stringify(req.style) : null,
    req.typeName ? req.typeName : null,
    req.type ? req.type : null,
    req.styleId ? req.styleId : null,
    req.styleName ? req.styleName : null,
    req.id,
  ];

  connect.query(query, values, (error, res) => {
    if (error) {
      return result(501, { message: "Something got wrong", error });
    }

    return result(200, {
      message: "DesignSystem updated successfully",
    });
  });
};

DesignSystem.findAll = (_, result) => {
  const query = "SELECT * FROM design_system";
  const values = [];

  connect.query(query, values, (error, res) => {
    if (error) {
      return result(501, { message: "Something got wrong", error });
    }

    return result(200, res);
  });
};

DesignSystem.deleteById = (req, result) => {
  const query = "DELETE FROM design_system WHERE id = ?";

  connect.query(query, req.id, (error) => {
    if (error) {
      return result(501, { message: "Something got wrong", error });
    }

    return result(200, { message: "DesignSystem deleted successfully" });
  });
};

module.exports = DesignSystem;
