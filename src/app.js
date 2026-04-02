const express = require("express");
const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send("Server is working");
});
app.use("/api/test", require("./routes/testRoutes"));
app.use("/api/auth", require("./routes/authRoute"));
module.exports = app;