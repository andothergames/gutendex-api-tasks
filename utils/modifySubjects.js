const modifySubjects = (data) => {
  const modifiedBooks = data.map((book) => {
    return {
      ...book,
      subjects: book.subjects.map((subject) => subject.toUpperCase()),
    };
  });
  console.log(modifiedBooks);
  return modifiedBooks;
};

module.exports = { modifySubjects };
