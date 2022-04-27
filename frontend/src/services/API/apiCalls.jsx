const deployLink = "https://api.bookrus.me";
const localLink = "http://localhost:5000";
const FAHLink = "https://api.findahome.me/";
const testing = false;

// BookRUs API Calls

export function getCountry(countryId) {
  const request = new XMLHttpRequest();
  const link = testing ? localLink : deployLink;
  request.open("GET", `${link}/countries/${countryId}`, false);
  request.setRequestHeader("Accept", "application/vnd.api+json");
  request.send();
  let response = null;
  if (request.status === 200) {
    response = JSON.parse(request.responseText);
  }
  return response;
}

export function getCountries(index, limit, sort, search) {
  const request = new XMLHttpRequest();
  const link = testing ? localLink : deployLink;
  let url = `${link}/countries?page=${index}`;
  if (limit != null) {
    url += `&limit=${limit}`;
  }
  if (sort != null) {
    url += `&sort=${sort}`;
  }
  if (search != null) {
    url += `&search=${search}`;
  }
  request.open("GET", url, false);
  request.setRequestHeader("Accept", "application/vnd.api+json");
  request.send();
  let response = null;
  if (request.status === 200) {
    response = JSON.parse(request.responseText);
  }
  return response;
}

export function getBook(bookId) {
  const request = new XMLHttpRequest();
  const link = testing ? localLink : deployLink;
  request.open("GET", `${link}/books/${bookId}`, false);
  request.setRequestHeader("Accept", "application/vnd.api+json");
  request.send();
  let response = null;
  if (request.status === 200) {
    response = JSON.parse(request.responseText);
  }
  return response;
}

export function getBooks(index, limit, sort, search) {
  const request = new XMLHttpRequest();
  const link = testing ? localLink : deployLink;
  let url = `${link}/books?page=${index}`;
  if (limit != null) {
    url += `&limit=${limit}`;
  }
  if (sort != null) {
    url += `&sort=${sort}`;
  }
  if (search != null) {
    url += `&search=${search}`;
  }
  request.open("GET", url, false);
  request.setRequestHeader("Accept", "application/vnd.api+json");
  request.send();
  let response = null;
  if (request.status === 200) {
    response = JSON.parse(request.responseText);
  }
  return response;
}

export function getAuthor(authorId) {
  const request = new XMLHttpRequest();
  const link = testing ? localLink : deployLink;
  request.open("GET", `${link}/authors/${authorId}`, false);
  request.setRequestHeader("Accept", "application/vnd.api+json");
  request.send();
  let response = null;
  if (request.status === 200) {
    response = JSON.parse(request.responseText);
  }
  return response;
}

export function getAuthors(index, limit, sort, search) {
  const request = new XMLHttpRequest();
  const link = testing ? localLink : deployLink;
  let url = `${link}/authors?page=${index}`;
  if (limit != null) {
    url += `&limit=${limit}`;
  }
  if (sort != null) {
    url += `&sort=${sort}`;
  }
  if (search != null) {
    url += `&search=${search}`;
  }
  request.open("GET", url, false);
  request.setRequestHeader("Accept", "application/vnd.api+json");
  request.send();
  let response = null;
  if (request.status === 200) {
    response = JSON.parse(request.responseText);
  }
  return response;
}

// FindAHome API Calls

// export function fgetCountry(countryId) {
//   request.open("GET", `${FAHLink}/countries/${countryId}`, false);
//   request.setRequestHeader("Accept", "application/vnd.api+json");
//   request.send();
//   let response = null;
//   if (request.status === 200) {
//     response = JSON.parse(request.responseText);
//   }
//   return response;
// }

// export function fgetCountries() {
//   request.open("GET", `${FAHLink}/countries/`, false);
//   request.setRequestHeader("Accept", "application/vnd.api+json");
//   request.send();
//   let response = null;
//   if (request.status === 200) {
//     response = JSON.parse(request.responseText);
//   }
//   return response;
// }

// export function fgetCharity(charityId) {
//   request.open("GET", `${FAHLink}/charities/${charityId}`, false);
//   request.setRequestHeader("Accept", "application/vnd.api+json");
//   request.send();
//   let response = null;
//   if (request.status === 200) {
//     response = JSON.parse(request.responseText);
//   }
//   return response;
// }

// export function fgetCharities() {
//   request.open("GET", `${FAHLink}/charities/`, false);
//   request.setRequestHeader("Accept", "application/vnd.api+json");
//   request.send();
//   let response = null;
//   if (request.status === 200) {
//     response = JSON.parse(request.responseText);
//   }
//   return response;
// }

// export function fgetArticle(newsId) {
//   request.open("GET", `${FAHLink}/news/${newsId}`, false);
//   request.setRequestHeader("Accept", "application/vnd.api+json");
//   request.send();
//   let response = null;
//   if (request.status === 200) {
//     response = JSON.parse(request.responseText);
//   }
//   return response;
// }

// export function fgetArticles() {
//   request.open("GET", `${FAHLink}/news/`, false);
//   request.setRequestHeader("Accept", "application/vnd.api+json");
//   request.send();
//   let response = null;
//   if (request.status === 200) {
//     response = JSON.parse(request.responseText);
//   }
//   return response;
// }
