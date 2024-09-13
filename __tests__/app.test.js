const { fetchBooks, fetchBooksSortedByID } = require("../api");

let data;
beforeAll(async () => {
  data = await fetchBooks();
});

const defaultPageLength = 32;

describe("GET /api/books", () => {
  test("GET: array of first page of books ordered by ascending download_count", () => {
    expect(data.results.length).toBe(defaultPageLength);
    expect(data.results).toBeSortedBy("download_count", {
      descending: true,
    });
  });
  test("GET: book objects contain keys we wish to use in the project", () => {
    data.results.forEach((book) => {
      expect(book).toHaveProperty("id");
      expect(book).toHaveProperty("title");
      expect(book).toHaveProperty("authors[0].name");
      expect(book).toHaveProperty("authors[0].death_year");
      expect(book).toHaveProperty("download_count");
    });
  });
});

describe("GET /api/books?sort=order", () => {
  test("GET: array of first page of books ordered by ID", async () => {
    const dataSortedByID = await fetchBooksSortedByID("ascending");
    expect(dataSortedByID.results.length).toBe(defaultPageLength);
    expect(dataSortedByID.results).toBeSortedBy("id", {
      ascending: true,
    });
  });
  //this test does not pass as the API is incorrectly ordering when in descending mode (I have also tested this directly with parameters in browser)
  test.skip("GET: array of first page of books ordered by ID", async () => {
    const dataSortedByID = await fetchBooksSortedByID("descending");
    expect(dataSortedByID.results.length).toBe(defaultPageLength);
    expect(dataSortedByID.results).toBeSortedBy("id", {
      descending: true,
    });
  });
});
