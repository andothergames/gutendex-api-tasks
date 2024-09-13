const { fetchNextBooks } = require("../api");

const searchBook = async (url, title) => {
  try {
    const data = await fetchNextBooks(url);
    const foundBook = data.results.find((book) => book.title === title);

    if (foundBook) {
      return foundBook;
    }
    if (!data.next) {
      return null;
    }
    console.log(searchBook);
    return searchBook(data.next, title);
  } catch (error) {
    console.log("Could not find book", error);
    return null;
  }
};

module.exports = { searchBook };
