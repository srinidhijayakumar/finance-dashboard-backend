const swaggerJsdoc = require("swagger-jsdoc");

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Finance Dashboard API",
      version: "1.0.0",
      description: `
     backend for financial tracking.
    
    Features:
    - JWT Authentication
    - Role-Based Access Control
    - Financial Analytics Dashboard
    - Trends & Insights
    `,
    },
    tags: [
      { name: "Auth", description: "Authentication APIs" },
      { name: "Records", description: "Financial records management" },
      { name: "Dashboard", description: "Analytics & insights" },
    ],
    servers: [
      {
        url: "http://localhost:5001",
      },
    ],
    components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            description: "Paste your JWT token like: Bearer <token>",
          },
        },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.js"],
});

module.exports = swaggerSpec;