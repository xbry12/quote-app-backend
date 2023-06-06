const express = require("express");
const fetch = require("isomorphic-fetch");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  fetch(
    "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en"
  )
    .then((response) => response.text())
    .then((text) => {
      console.log("Response text:", text);

      try {
        const data = JSON.parse(text);

        const quoteText = data.quoteText;
        const quoteAuthor = data.quoteAuthor;

        const quote = {
          text: quoteText,
          author: quoteAuthor,
        };

        res.json(quote);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        res.status(500).json({ error: "Failed to fetch quote" });
      }
    })
    .catch((error) => {
      console.error("Error fetching quote:", error);
      res.status(500).json({ error: "Failed to fetch quote" });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
