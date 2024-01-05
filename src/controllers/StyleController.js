const Style = require("../models/Style.js");

exports.create = (req, res) => {
  const styleReq = new Style({
    styleInline: req.body.styleInline,
    styleHover: req.body.styleHover,
    designId: req.body.designId,
    name: req.body.name,
    id: req.body.id,
  });

  if (req.body.id) {
    Style.updateById(styleReq, (status, data) => {
      return res.status(status).send(data);
    });
  } else {
    if (!req.body.designId || !req.body.name) {
      return res.status(400).send({
        message: "DesignId and Name are required!",
      });
    }

    Style.create(styleReq, (status, data) => {
      return res.status(status).send(data);
    });
  }
};

exports.delete = (req, res) => {
  const styleReq = new Style({
    id: req.params.id,
  });

  Style.deleteById(styleReq, (status, data) => {
    return res.status(status).send(data);
  });
};
