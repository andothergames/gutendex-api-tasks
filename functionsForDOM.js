const fetchFromUrl = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      let message = `Sorry there is an error: ${response.status}`;

      if (response.status === 404) {
        message = "404: not found";
      } else if (response.status === 500) {
        message = "500: Server error";
      }
      throw new Error(message);
    }
    return await response.json();
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

export const fetchBooks = async () => {
  const url = "https://gutendex.com/books";
  try {
    const data = await fetchFromUrl(url);
    return data.results;
  } catch (error) {
    console.log("Error:", error.message);
    return [];
  }
};

export const fetchNextBooks = async (url) => {
  try {
    const data = await fetchFromUrl(url);
    return data;
  } catch (error) {
    console.log("Error:", error.message);
    return [];
  }
};

export const fetchBooksSortedByID = async (order) => {
  try {
    const url = `https://gutendex.com/books?sort=${order}`;
    const data = await fetchFromUrl(url);
    return data.results;
  } catch (error) {
    console.log("Error:", error.message);
    return [];
  }
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
  console.log("Loading:", url);
  try {
    const data = await fetchNextBooks(url);

    if (!data) {
      console.log("There was an error in fetching the books.");
      return;
    }
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
