const DesignSystem = require("../models/DesignSystem.js");

exports.create = (req, res) => {
  const desReq = new DesignSystem({
    element: req.body.element,
    styleId: req.body.styleId,
    style: req.body.style,
    type: req.body.type,
    typeName: req.body.typeName,
    styleName: req.body.styleName,
    id: req.body.id,
  });

  if (req.body.id) {
    DesignSystem.updateById(desReq, (status, data) => {
      return res.status(status).send(data);
    });
  } else {
    if (
      !req.body.element ||
      !req.body.styleId ||
      !req.body.style ||
      !req.body.type ||
      !req.body.typeName
    ) {
      return res.status(400).send({
        message: "Element, Style, Type are required!",
      });
    }

    DesignSystem.create(desReq, (status, data) => {
      return res.status(status).send(data);
    });
  }
};

exports.delete = (req, res) => {
  const desReq = new DesignSystem({
    id: req.params.id,
  });

  DesignSystem.deleteById(desReq, (status, data) => {
    return res.status(status).send(data);
  });
};

exports.getAll = (_, res) => {
  DesignSystem.findAll(_, (status, data) => {
    return res.status(status).send(data);
  });
};
