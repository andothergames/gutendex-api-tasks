const axios = require("axios");

const gutendexAPI = axios.create({
  baseURL: "https://gutendex.com",
});

const fetchBooks = async () => {
  const res = await gutendexAPI.get("/books");
  return res.data;
};

const fetchNextBooks = async (url) => {
  const res = await axios.get(url);
  return res.data;
};

const fetchBooksSortedByID = async (order) => {
  const res = await gutendexAPI.get(`/books?sort=${order}`);
  return res.data;
};

module.exports = { fetchBooks, fetchNextBooks, fetchBooksSortedByID };
