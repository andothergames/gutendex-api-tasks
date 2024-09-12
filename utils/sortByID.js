const { fetchBooks } = require("../api");

const sortByID = () => {
  return fetchBooks().then((data) => {
    const sortedArray = data.results.sort((a, b) => a.id - b.id);
    return sortedArray;
  });
};

module.exports = { sortByID };
