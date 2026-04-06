const express = require("express");
const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).send("Server is working");
});
app.use("/api/test", require("./routes/testRoutes"));
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/records", require("./routes/recordRoute"));
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info { margin-bottom: 20px }
      body { background-color: #0f172a; }
      .swagger-ui { color: #e2e8f0; }
    `,
    customSiteTitle: "Finance Dashboard API 🚀",
  })
);
module.exports = app;