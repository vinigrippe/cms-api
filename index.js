// const express = require("express");
// const bodyParser = require("body-parser");

// const userRouter = require("./src/routes/users");
// const loginRouter = require("./src/routes/login");
// const pageRouter = require("./src/routes/pages");
// const designRouter = require("./src/routes/designSystem");

// const app = express();
// const port = 3000;

// app.use(bodyParser.json());

// app.use("/", userRouter);
// app.use("/", loginRouter);
// app.use("/", pageRouter);
// app.use("/", designRouter);

// app.get("/ping", (_, res) => res.send("Pong!"));

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// module.exports = app;

const express = require("express");
const app = express();
const PORT = 4000;

app.get("/home", (req, res) => {
  res.status(200).json("Welcome, your app is working well");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Export the Express API
module.exports = app;
