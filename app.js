const express = require("express");
const bodyParser = require("body-parser");

const userRouter = require("./src/routes/users");
const loginRouter = require("./src/routes/login");
const pageRouter = require("./src/routes/pages");
const designRouter = require("./src/routes/designSystem");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use("/", userRouter);
app.use("/", loginRouter);
app.use("/", pageRouter);
app.use("/", designRouter);

app.get("/ping", (_, res) => res.send("Pong!"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
