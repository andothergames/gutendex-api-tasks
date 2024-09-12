const { sortByID } = require("../utils/sortByID")

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