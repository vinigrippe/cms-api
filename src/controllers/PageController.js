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

exports.getAll = (req, res) => {
  if (!req.params.websiteId) {
    return res.status(400).send({
      message: "Website ID is required!",
    });
  }

  const pageReq = new Page({
    websiteId: req.params.websiteId,
  });

  Page.findAll(pageReq, (status, data) => {
    return res.status(status).send(data);
  });
};

exports.create = async (req, res) => {
  const pageReq = new Page({
    title: req.body.title,
    url: req.body.url,
    elements: req.body.elements,
    status: req.body.status,
    userCreator: req.body.userCreator,
    userId: req.body.userId,
    id: req.body.id,
    websiteId: req.body.websiteId,
  });

  if (!pageReq.elements)
    return res.status(400).send({ message: "Elements is required!" });

  if (pageReq.id) {
    const update = new Promise((resolve) => {
      Page.updateById(pageReq, (status, data) => {
        resolve({ status, data });
      });
    });

    const history = new Promise((resolve) => {
      Page.createHistory(pageReq, (status, data) => {
        resolve({ status, data });
      });
    });

    Promise.all([update, history])
      .then(() => {
        res.status(201).send({
          message: "Page updated successfully!",
          ...update.data,
          ...history.data,
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } else {
    if (
      !pageReq.title ||
      !pageReq.url ||
      !pageReq.status ||
      !pageReq.userCreator ||
      !pageReq.websiteId
    ) {
      return res.status(400).send({
        message:
          "Title, status, userCreator, websiteId, elements and url are required!",
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
