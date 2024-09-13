const { fetchBooks } = require("../api");

const sortByID = async () => {
  const data = await fetchBooks();
  const sortedArray = data.results.sort((a, b) => a.id - b.id);
  return sortedArray;
};

module.exports = { sortByID };
