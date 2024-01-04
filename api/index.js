const bodyParser = require("body-parser");

const userRouter = require("./src/routes/users");
const loginRouter = require("./src/routes/login");
const pageRouter = require("./src/routes/pages");
const designRouter = require("./src/routes/designSystem");

const express = require("express");
const app = express();
const PORT = 4000;

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
