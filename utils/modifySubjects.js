const modifySubjects = (data) => {
  const modifiedBooks = data.map((book) => {
    return {
      ...book,
      subjects: book.subjects.map((subject) => subject.toUpperCase()),
    };
  });
  return modifiedBooks;
};

module.exports = { modifySubjects };
