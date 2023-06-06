const fetch = require("node-fetch");

// Function to fetch a random quote from the Forismatic API
function fetchRandomQuote() {
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const quoteText = data.quoteText;
      const quoteAuthor = data.quoteAuthor;

      // Display the quote or perform any desired operations
      console.log(quoteText);
      console.log(quoteAuthor);
    })
    .catch((error) => {
      console.error("Error fetching quote:", error);
    });
}

// Call the function to fetch a random quote
fetchRandomQuote();
