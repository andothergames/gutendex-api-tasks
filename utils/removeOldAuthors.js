const removeOldAuthors = (data) => {
const modifiedBooks = data.filter((book) => {
    return book.authors.every((author) => checkYear(author.death_year))
      });
    return modifiedBooks;
  };

  const checkYear = (year) => {
    return year > 1824;
  }

  
  module.exports = { removeOldAuthors };
  