export function getCountry(countryId) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://api.bookrus.me/country/${countryId}`, false);
  request.setRequestHeader("Accept", "application/vnd.api+json");
  request.send();
  let response = null;
  if (request.status === 200) {
    response = JSON.parse(request.responseText);
  }
  return response;
}

export function getCountries(index) {
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://api.bookrus.me/country?page[number]=${index}`,
    false
  );
  request.setRequestHeader("Accept", "application/vnd.api+json");
  request.send();
  let countries = null;
  let response = null;
  if (request.status === 200) {
    response = JSON.parse(request.responseText);
    countries = response.countries;
  }
  return countries;
}

export function getBook(bookId) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://api.bookrus.me/book/${bookId}`, false);
  request.setRequestHeader("Accept", "application/vnd.api+json");
  request.send();
  let response = null;
  if (request.status === 200) {
    response = JSON.parse(request.responseText);
  }
  return response;
}

export function getBooks(index) {
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://api.bookrus.me/book?page[number]=${index}`,
    false
  );
  request.setRequestHeader("Accept", "application/vnd.api+json");
  request.send();
  let books = null;
  let response = null;
  if (request.status === 200) {
    response = JSON.parse(request.responseText);
    books = response.books;
  }
  return books;
}

export function getAuthor(authorId) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://api.bookrus.me/author/${authorId}`, false);
  request.setRequestHeader("Accept", "application/vnd.api+json");
  request.send();
  let response = null;
  if (request.status === 200) {
    response = JSON.parse(request.responseText);
  }
  return response;
}

export function getAuthors(index) {
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://api.bookrus.me/author?page[number]=${index}`,
    false
  );
  request.setRequestHeader("Accept", "application/vnd.api+json");
  request.send();
  let authors = null;
  let response = null;
  if (request.status === 200) {
    response = JSON.parse(request.responseText);
    authors = response.authors;
  }
  return authors;
}
