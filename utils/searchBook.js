const { fetchNextBooks } = require("../api");

const searchBook = (url, title) => {
  return fetchNextBooks(url).then((data) => {
    const foundBook = data.results.find((book) => book.title === title);

    if (foundBook) {
      return foundBook;
    }
    if (!data.next) {
      return null;
    }
    if(!foundBook) {
      return searchBook(data.next, title);
    }
  });
};

module.exports = { searchBook };
