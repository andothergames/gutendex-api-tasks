import {
  fetchBooks,
  sortByID,
  modifySubjects,
  removeOldAuthors,
  searchBook,
} from "./functionsForDOM.js";

console.log("Hello! Welcome to the console");
let data;

//fetchBooks show Books Button
const showBooksButton = document.getElementById("books-button");
showBooksButton.addEventListener("click", async function () {
  console.log("Loading...");
  data = await fetchBooks();
  console.log("First Page of Books:", data);
});

//order Books by ID
const orderBooksByIDButton = document.getElementById("order-button");
orderBooksByIDButton.addEventListener("click", async function () {
  const sortedBooks = await sortByID(data);
  console.log("Sorted by ID books:", sortedBooks);
});

//modify Subjects
const modifyButton = document.getElementById("modify-button");
modifyButton.addEventListener("click", function () {
  if (!data) {
    console.error("Please click show books first.");
    return;
  }
  modifySubjects(data);
});

//remove authors
const removeAuthorsButton = document.getElementById("remove-authors-button");
removeAuthorsButton.addEventListener("click", function () {
  if (!data) {
    console.error("Please click show books first.");
    return;
  }
  removeOldAuthors(data);
});

//search For a title
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", async function () {
  const searchTerm = document.getElementById("search-term").value;
  const foundBook = await searchBook("https://gutendex.com/books", searchTerm);
});
