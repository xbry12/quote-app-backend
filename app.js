const express = require("express");
const fetch = require("isomorphic-fetch");
const { FetchError } = require("node-fetch"); // Import FetchError

const app = express();
const PORT = 3000;

const winston = require("winston");

// Create a logger instance
const logger = winston.createLogger({
  level: "error",
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log" }),
  ],
});

/**
 * @swagger
 * /quote:
 *   get:
 *     summary: Retrieve a random quote
 *     description: Retrieve a random quote from the API
 *     responses:
 *       200:
 *         description: Successful response with the quote
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Quote'
 */
app.get("/quote", (req, res) => {
  // Code to retrieve a quote
});

app.get("/", (req, res) => {
  fetch(
    "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en"
  )
    .then((response) => {
      if (!response.ok) {
        if (response.status >= 500) {
          throw new Error("API Error: Internal Server Error");
        } else if (response.status >= 400) {
          throw new Error("API Error: Bad Request");
        } else {
          throw new Error("API Error");
        }
      }
      return response.json();
    })
    .then((data) => {
      const quoteText = data.quoteText;
      const quoteAuthor = data.quoteAuthor;

      const quote = {
        text: quoteText,
        author: quoteAuthor,
      };

      res.json(quote);
    })
    .catch((error) => {
      if (error instanceof FetchError) {
        logger.error("Network Error:", error);
        res.status(500).json({ error: "Network Error" });
      } else {
        logger.error("Error fetching quote:", error);
        throw error; // Propagate the error to the next error handler
      }
    })
    .catch((error) => {
      logger.error("Unhandled error:", error);
      res.status(500).json({ error: error.message }); // Handle the propagated error
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
