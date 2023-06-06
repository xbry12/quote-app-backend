## Quote API Integration

This app integrates with the Forismatic API to retrieve random quotes for display. The Forismatic API provides a collection of inspirational quotes that you can fetch programmatically.

### Installation

No specific installation steps are required for the Forismatic API integration. However, ensure that your app has an active internet connection to communicate with the API.

### Usage

To retrieve a random quote from the Forismatic API, follow these steps:

1. Make an HTTP GET request to the Forismatic API endpoint: `http://api.forismatic.com/api/1.0/`.

2. Include the following query parameters in the request URL:
   - `method=getQuote`: Specifies the method to retrieve a quote.
   - `format=json`: Requests the response in JSON format.
   - `lang=en`: Sets the language of the quote (English).

3. Parse the API response to extract the quote text and author information.

Here's an example using JavaScript:

```javascript
fetch('http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en')
  .then(response => response.json())
  .then(data => {
    const quoteText = data.quoteText;
    const quoteAuthor = data.quoteAuthor;

    // Use the quoteText and quoteAuthor in your app
    console.log(quoteText);
    console.log(quoteAuthor);
  })
  .catch(error => {
    console.error('Error fetching quote:', error);
  });
