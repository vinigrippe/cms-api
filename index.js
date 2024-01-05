const bodyParser = require("body-parser");
const cors = require("cors");

const userRouter = require("./src/routes/users");
const loginRouter = require("./src/routes/login");
const pageRouter = require("./src/routes/pages");
const designRouter = require("./src/routes/design");
const styleRouter = require("./src/routes/styles");
const websiteRouter = require("./src/routes/websites");

const express = require("express");
const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());

app.use("/", userRouter);
app.use("/", loginRouter);
app.use("/", pageRouter);
app.use("/", designRouter);
app.use("/", websiteRouter);
app.use("/", styleRouter);

app.get("/ping", (_, res) => res.status(200).json("Pong!"));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running`);
});
