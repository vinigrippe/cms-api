const Design = require("../models/Design.js");
const Style = require("../models/Style.js");

exports.create = (req, res) => {
  const desReq = new Design({
    element: req.body.element,
    name: req.body.name,
    id: req.body.id,
  });

  if (desReq.id) {
    Design.updateById(desReq, (status, data) => {
      return res.status(status).send(data);
    });
  } else {
    if (!desReq.element || !desReq.name) {
      return res.status(400).send({
        message: "Element and Name are required!",
      });
    }

    Design.create(desReq, (status, data) => {
      return res.status(status).send(data);
    });
  }
};

exports.delete = (req, res) => {
  const desReq = new Design({
    id: req.params.id,
  });

  Design.deleteById(desReq, (status, data) => {
    return res.status(status).send(data);
  });
};

exports.getAll = (_, res) => {
  Design.findAll((status, data) => {
    const promises = data.map((element) => {
      return new Promise((resolve) => {
        Style.findByDesignId(element, (_, styles) => {
          element.styles = styles;
          resolve();
        });
      });
    });

    Promise.all(promises)
      .then(() => {
        res.status(status).send(data);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  });
};
