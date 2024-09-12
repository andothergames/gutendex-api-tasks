const axios = require("axios");

const gutendexAPI = axios.create({
  baseURL: "https://gutendex.com",
});

const fetchBooks = () => {
  return gutendexAPI.get("/books").then((res) => {
    return res.data;
  });
};

const fetchBooksSortedByID = (order) => {
  return gutendexAPI.get(`/books?sort=${order}`).then((res) => {
    return res.data;
  });
};

module.exports = { fetchBooks, fetchBooksSortedByID };
