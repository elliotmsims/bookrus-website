export function getCountry(countryId) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://api.bookrus.me/country/${countryId}`, false);
  request.setRequestHeader("Accept", "application/vnd.api+json");
  request.send();
  let country = null;
  let response = null;
  if (request.status === 200) {
    response = JSON.parse(request.responseText);
    country = response.data.attributes;
  }
  return country;
}

export function getCountries(index) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://api.bookrus.me/country?page=${index}`, false);
  request.setRequestHeader("Accept", "application/vnd.api+json");
  request.send();
  let countries = null;
  let response = null;
  if (request.status === 200) {
    response = JSON.parse(request.responseText);
    countries = response.data;
  }
  return countries;
}

export function getBook(bookId) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://api.bookrus.me/book/${bookId}`, false);
  request.setRequestHeader("Accept", "application/vnd.api+json");
  request.send();
  let book = null;
  let response = null;
  if (request.status === 200) {
    response = JSON.parse(request.responseText);
    book = response.data.attributes;
  }
  return book;
}

export function getBooks(index) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://api.bookrus.me/book?page=${index}`, false);
  request.setRequestHeader("Accept", "application/vnd.api+json");
  request.send();
  let books = null;
  let response = null;
  if (request.status === 200) {
    response = JSON.parse(request.responseText);
    books = response.data;
  }
  return books;
}

export function getAuthor(authorId) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://api.bookrus.me/author/${authorId}`, false);
  request.setRequestHeader("Accept", "application/vnd.api+json");
  request.send();
  let author = null;
  let response = null;
  if (request.status === 200) {
    response = JSON.parse(request.responseText);
    author = response.data.attributes;
  }
  return author;
}

export function getAuthors(index) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://api.bookrus.me/author?page=${index}`, false);
  request.setRequestHeader("Accept", "application/vnd.api+json");
  request.send();
  let authors = null;
  let response = null;
  if (request.status === 200) {
    response = JSON.parse(request.responseText);
    authors = response.data;
  }
  return authors;
}
