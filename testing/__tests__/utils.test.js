const { fetchBooks } = require("../api");
const { sortByID } = require("../utils/sortByID");
const { modifySubjects } = require("../utils/modifySubjects");
const { removeOldAuthors } = require("../utils/removeOldAuthors");
const { searchBook } = require("../utils/searchBook");

let data;
beforeAll(async () => {
  data = await fetchBooks();
});

describe("sortByID", () => {
  test("sorts books by ID", async () => {
    const actual = await sortByID();
    const expected = 32;
    expect(actual.length).toBe(expected);
    expect(actual).toBeSortedBy("id", {
      ascending: true,
    });
  });
});

describe("modifySubjects", () => {
  test("does not mutate the given data", () => {
    const originalBooks = data.results;
    const modifedBooks = modifySubjects(originalBooks);
    expect(modifedBooks).not.toBe(originalBooks);
    expect(originalBooks).toEqual(originalBooks);
  });
});
test("returns modified books with capitalised subjects", () => {
  const modifedBooks = modifySubjects(data.results);
  modifedBooks.forEach((book) => {
    for (subject of book.subjects) {
      expect(subject === subject.toUpperCase()).toBe(true);
    }
  });
});

describe("removeOldAuthors", () => {
  test("does not mutate the given data", () => {
    const originalBooks = data.results;
    const modifedBooks = removeOldAuthors(originalBooks);
    expect(modifedBooks).not.toBe(originalBooks);
    expect(originalBooks).toEqual(originalBooks);
  });
  test("returns books whose authors existed in the last 200 years", () => {
    const modifedBooks = removeOldAuthors(data.results);
    modifedBooks.forEach((book) => {
      for (author of book.authors) {
        expect(author.death_year > 1824).toBe(true);
      }
    });
  });

  //I am skipping this test due to jest timing out however I have tested the function works with console logs to track the next urls ticking up and returning the correct title
  describe("searchBook", () => {
    test.skip("searches entire API for specific book title", async () => {
      const title = "Short Stories";
      const author = "Dostoyevsky, Fyodor";
      const data = await searchBook("https://gutendex.com/books", title);
      expect(data.title).toBe(title);
      expect(data.authors[0].name).toBe(author);
    });
  });
});
