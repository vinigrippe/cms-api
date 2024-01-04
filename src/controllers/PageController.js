const Page = require("../models/Page");

exports.get = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({
      message: "ID is required!",
    });
  }

  const pageReq = new Page({
    id: req.params.id,
  });

  await Page.findById(pageReq, async (status, data) => {
    await Page.findHistoryById(pageReq, (_, history) => {
      return res.status(status).send({ ...data, history });
    });
  });
};

exports.getAll = (_, res) => {
  Page.findAll(_, (status, data) => {
    return res.status(status).send(data);
  });
};

exports.create = async (req, res) => {
  const pageReq = new Page({
    title: req.body.title,
    url: req.body.url,
    elements: req.body.elements,
    status: req.body.status,
    userId: req.body.userId,
    id: req.body.id,
  });

  if (req.body.id) {
    await Page.updateById(pageReq, async (status, data) => {
      await Page.createHistory(pageReq, () => {
        return res.status(status).send(data);
      });
    });
  } else {
    if (
      !req.body.title ||
      !req.body.url ||
      !req.body.elements ||
      !req.body.status ||
      !req.body.userId
    ) {
      return res.status(400).send({
        message: "Title, status, userId, elements and url are required!",
      });
    }

    await Page.create(pageReq, async (status, data) => {
      await Page.createHistory({ ...pageReq, id: data.res.insertId }, () => {
        return res.status(status).send({ message: data.message });
      });
    });
  }
};

exports.delete = async (req, res) => {
  const pageReq = new Page({
    id: req.params.id,
  });

  await Page.deleteById(pageReq, async (status, data) => {
    return res.status(status).send(data);
  });
};
