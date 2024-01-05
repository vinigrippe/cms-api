const Website = require("../models/Website");

exports.get = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({
      message: "ID is required!",
    });
  }

  const websiteReq = new Website({
    id: req.params.id,
  });

  await Website.findById(websiteReq, async (status, data) => {
    await Website.findHistoryById(websiteReq, (_, history) => {
      return res.status(status).send({ ...data, history });
    });
  });
};

exports.getAll = (_, res) => {
  Website.findAll(_, (status, data) => {
    return res.status(status).send(data);
  });
};

exports.create = async (req, res) => {
  const websiteReq = new Website({
    id: req.body.id,
    title: req.body.title,
    icon: req.body.icon,
    status: req.body.status,
    userCreator: req.body.userCreator,
  });

  if (req.body.id) {
    await Website.updateById(websiteReq, async (status, data) => {
      await Website.createHistory(websiteReq, () => {
        return res.status(status).send(data);
      });
    });
  } else {
    if (!req.body.title || !req.body.status) {
      return res.status(400).send({
        message: "Title and status are required!",
      });
    }

    await Website.create(websiteReq, async (status, data) => {
      await Website.createHistory(
        { ...websiteReq, id: data.res.insertId },
        () => {
          return res.status(status).send({ message: data.message });
        }
      );
    });
  }
};

exports.delete = async (req, res) => {
  const websiteReq = new Website({
    id: req.params.id,
  });

  await Website.deleteById(websiteReq, async (status, data) => {
    return res.status(status).send(data);
  });
};
