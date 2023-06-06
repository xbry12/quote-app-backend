import express from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Quote API",
      version: "1.0.0",
      description: "API for retrieving quotes",
    },
    components: {
      schemas: {
        Quote: {
          type: "object",
          properties: {
            text: {
              type: "string",
            },
            author: {
              type: "string",
            },
          },
        },
      },
    },
  },
  apis: ["./app.mjs"], // Path to your main API file
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

// Serve the Swagger UI at /api-docs endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Swagger UI is running on http://localhost:${PORT}/api-docs`);
});
