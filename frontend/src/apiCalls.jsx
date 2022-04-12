const deployLink = "https://api.bookrus.me";
const localLink = "http://localhost:5000";
const testing = true;

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

export function getCountries(index, sort) {
  const request = new XMLHttpRequest();
  const link = testing ? localLink : deployLink;
  let url = `${link}/countries?page=${index}`;
  if (sort != null) {
    url += `&sort=${sort}`;
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

export function getBooks(index, sort) {
  const request = new XMLHttpRequest();
  const link = testing ? localLink : deployLink;
  let url = `${link}/books?page=${index}`;
  if (sort != null) {
    url += `&sort=${sort}`;
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

export function getAuthors(index, sort) {
  const request = new XMLHttpRequest();
  const link = testing ? localLink : deployLink;
  let url = `${link}/authors?page=${index}`;
  if (sort != null) {
    url += `&sort=${sort}`;
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

export function getAuthorFiltered(author_name=null,
  author_nationality=null,
  author_genre=null,
  author_work_count=null,
  author_bio=null,
  index, 
  sort) {
    const request = new XMLHttpRequest();
    const link = testing ? localLink : deployLink;
    let url = `${link}/authors?page=${index}`;
    if (author_name != null) {
      url += `&author_name=${author_name}`;
    }
    if (author_nationality != null) {
      url += `&author_nationality=${author_nationality}`;
    }
    if (author_genre != null) {
      url += `&author_genre=${author_genre}`;
    }
    if (author_work_count != null) {
      url += `&author_work_count=${author_work_count}`;
    }
    if (author_bio != null) {
      url += `&author_bio=${author_bio}`;
    }
    if (sort != null) {
      url += `&sort=${sort}`;
    }
    request.open("GET", url, false);
    request.setRequestHeader("Accept", "application/vnd.api+json");
    request.send();
    if (request.status === 200) {
      response = JSON.parse(request.responseText);
    }
    return response;
  }