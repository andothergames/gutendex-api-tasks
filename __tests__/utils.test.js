const { sortByID } = require("../utils/sortByID");
const { toUppercase } = require("../utils/toUppercase");

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

describe("toUppercase", () => {
  test("returns string as uppercase", () => {
    const input = "hello";
    const actual = toUppercase(input);
    const expected = "HELLO";
    expect(actual).toBe(expected);
  });
  test("returns string as uppercase if mixed with numbers", () => {
    const input = "thisISaTest100";
    const actual = toUppercase(input);
    const expected = "THISISATEST100";
    expect(actual).toBe(expected);
  });
  test("returns string as uppercase if mixed with symbols", () => {
    const input = "this -- is a / test";
    const actual = toUppercase(input);
    const expected = "THIS -- IS A / TEST";
    expect(actual).toBe(expected);
  });
});
