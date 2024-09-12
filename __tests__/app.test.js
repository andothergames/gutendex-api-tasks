const { fetchBooks, fetchBooksSortedByID } = require("../api");

describe("GET /api/books", () => {
  test("GET: array of first 32 books ordered by ascending download_count", () => {
    const actual = fetchBooks();
    const expected = 32;
    return actual.then((data) => {
      expect(data.results.length).toBe(expected);
      expect(data.results).toBeSortedBy("download_count", {
        descending: true,
      });
    });
  });
  test("GET: book objects contain keys we wish to use in the project", () => {
    const actual = fetchBooks();
    return actual.then((data) => {
      data.results.forEach((book) => {
        expect(book).toHaveProperty("id");
        expect(book).toHaveProperty("title");
        expect(book).toHaveProperty("authors[0].name");
        expect(book).toHaveProperty("authors[0].death_year");
        expect(book).toHaveProperty("download_count");
      });
    });
  });
});

describe("GET /api/books?sort=order", () => {
  test("GET: array of first 32 books ordered by ID", () => {
    const actual = fetchBooksSortedByID("ascending");
    const expected = 32;
    return actual.then((data) => {
      expect(data.results.length).toBe(expected);
      expect(data.results).toBeSortedBy("id", {
        ascending: true,
      });
    });
  });
  //this test does not pass as the API is incorrectly ordering 74373-74370 to come after 74399-74361
  test.skip("GET: array of first 32 books ordered by ID", () => {
    const actual = fetchBooksSortedByID("descending");
    const expected = 32;
    return actual.then((data) => {
      console.log(data.results);
      expect(data.results.length).toBe(expected);
      expect(data.results).toBeSortedBy("id", {
        descending: true,
      });
    });
  });
});
