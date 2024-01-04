const bodyParser = require("body-parser");

const userRouter = require("./src/routes/users");
const loginRouter = require("./src/routes/login");
const pageRouter = require("./src/routes/pages");
const designRouter = require("./src/routes/designSystem");

const express = require("express");
const app = express();
const PORT = 4000;

const whitelist = ["*"];

app.use((req, res, next) => {
  const origin = req.get("referer");
  const isWhitelisted = whitelist.find((w) => origin && origin.includes(w));
  if (isWhitelisted) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,Content-Type,Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
  }
  // Pass to next layer of middleware
  if (req.method === "OPTIONS") res.sendStatus(200);
  else next();
});

const setContext = (req, res, next) => {
  if (!req.context) req.context = {};
  next();
};
app.use(setContext);

app.use(bodyParser.json());

app.use("/", userRouter);
app.use("/", loginRouter);
app.use("/", pageRouter);
app.use("/", designRouter);

app.get("/ping", (_, res) => res.status(200).json("Pong!"));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
