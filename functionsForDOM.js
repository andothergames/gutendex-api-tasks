const fetchFromUrl = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const fetchBooks = async () => {
  const url = "https://gutendex.com/books";
  const data = await fetchFromUrl(url);
  return data.results;
};

export const fetchNextBooks = async (url) => {
  const data = await fetchFromUrl(url);
  return data;
};

export const fetchBooksSortedByID = async (order) => {
  const url = `https://gutendex.com/books?sort=${order}`;
  const data = await fetchFromUrl(url);
  return data.results;
};

export const sortByID = (books) => {
  const sortedBooks = books.sort((a, b) => a.id - b.id);
  return sortedBooks;
};

export const modifySubjects = (books) => {
  const modifiedBooks = books.map((book) => {
    return {
      ...book,
      subjects: book.subjects.map((subject) => subject.toUpperCase()),
    };
  });
  console.log(modifiedBooks);
  return modifiedBooks;
};

export const removeOldAuthors = (books) => {
  const modifiedBooks = books.filter((book) => {
    return book.authors.every((author) => checkYear(author.death_year));
  });
  console.log(modifiedBooks);
  return modifiedBooks;
};

const checkYear = (year) => {
  return year > 1824;
};

export const searchBook = async (url, title) => {
  console.log("Still loading", url);
  try {
    const data = await fetchNextBooks(url);
    const foundBook = data.results.find((book) => book.title === title);

    if (foundBook) {
      console.log(
        `Yes, ${foundBook.title} exists. ${foundBook.title} by ${foundBook.authors[0].name}.`
      );
      return;
    }
    if (!data.next) {
      console.log("Book not found");
      return;
    }
    searchBook(data.next, title);
  } catch (error) {
    console.log("Could not find book", error);
    return null;
  }
};
