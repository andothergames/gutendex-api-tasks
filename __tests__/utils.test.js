const { fetchBooks } = require("../api");
const { sortByID } = require("../utils/sortByID");
const { modifySubjects } = require("../utils/modifySubjects");
const { removeOldAuthors } = require("../utils/removeOldAuthors");
const { searchBook } = require("../utils/searchBook")

describe("sortByID", () => {
  test("sorts books by ID", () => {
    const actual = sortByID();
    const expected = 32;
    return actual.then((array) => {
      expect(array.length).toBe(expected);
      expect(array).toBeSortedBy("id", {
        ascending: true,
      });
    });
  });
});

describe("modifySubjects", () => {
  test("does not mutate the given data", () => {
    return fetchBooks().then((data) => {
      const originalBooks = data.results;
      const modifedBooks = modifySubjects(originalBooks);
      expect(modifedBooks).not.toBe(originalBooks);
      expect(originalBooks).toEqual(originalBooks);
    });
  });
  test("returns modified books with capitalised subjects", () => {
    return fetchBooks().then((data) => {
      const modifedBooks = modifySubjects(data.results);
      modifedBooks.forEach((book) => {
        for (subject of book.subjects) {
          expect(subject === subject.toUpperCase()).toBe(true);
        }
      });
    });
  });
});

describe("removeOldAuthors", () => {
  test("does not mutate the given data", () => {
    return fetchBooks().then((data) => {
      const originalBooks = data.results;
      const modifedBooks = removeOldAuthors(originalBooks);
      expect(modifedBooks).not.toBe(originalBooks);
      expect(originalBooks).toEqual(originalBooks);
    });
  });
  test("returns books whose authors existed in the last 200 years", () => {
    return fetchBooks().then((data) => {
      const modifedBooks = removeOldAuthors(data.results);
      modifedBooks.forEach((book) => {
        for (author of book.authors) {
          expect(author.death_year > 1824).toBe(true);
        }
      });
    });
  });
});

describe("searchBook", () => {
  test.only("searches entire API for specific book title", () => {
    const title = "Short Stories";
    const author = "Dostoyevsky, Fyodor";
    searchBook("https://gutendex.com/books", title).then((data) => {
      expect(data.title).toBe(title);
      expect(data.authors[0].name).toBe(author);
    });
  });
});

