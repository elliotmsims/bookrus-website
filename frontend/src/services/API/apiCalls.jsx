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

export function getCountries(index, limit, sort, search, region, population) {
  const request = new XMLHttpRequest();
  const link = testing ? localLink : deployLink;
  let url = `${link}/countries?`;
  if (index != null) {
    url += `&page=${index}`;
  }
  if (limit != null) {
    url += `&limit=${limit}`;
  }
  if (sort != null) {
    url += `&sort=${sort}`;
  }
  if (search != null) {
    url += `&search=${search}`;
  }
  if (region != null) {
    url += `&region=${region}`;
  }
  if (population != null) {
    url += `&population=${population}`;
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

export function getBooks(
  index,
  limit,
  sort,
  search,
  language,
  genre,
  length,
  maturity
) {
  const request = new XMLHttpRequest();
  const link = testing ? localLink : deployLink;
  let url = `${link}/books?`;
  if (index != null) {
    url += `&page=${index}`;
  }
  if (limit != null) {
    url += `&limit=${limit}`;
  }
  if (sort != null) {
    url += `&sort=${sort}`;
  }
  if (search != null) {
    url += `&search=${search}`;
  }
  if (language != null) {
    url += `&language=${language}`;
  }
  if (genre != null) {
    url += `&genre=${genre}`;
  }
  if (length != null) {
    url += `&length=${length}`;
  }
  if (maturity != null) {
    url += `&maturity=${maturity}`;
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
// PUT IN FILTERS
export function getAuthors(
  index,
  limit,
  sort,
  search,
  works,
  genre,
  nationality
) {
  const request = new XMLHttpRequest();
  const link = testing ? localLink : deployLink;
  let url = `${link}/authors?`;
  if (index != null) {
    url += `&page=${index}`;
  }
  if (limit != null) {
    url += `&limit=${limit}`;
  }
  if (sort != null) {
    url += `&sort=${sort}`;
  }
  if (search != null) {
    url += `&search=${search}`;
  }
  if (works != null) {
    url += `&work-count=${works}`;
  }
  if (genre != null) {
    url += `&gmain-genre=${genre}`;
  }
  if (nationality != null) {
    url += `&nationality=${nationality}`;
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

export function fgetCountry(countryId) {
  const request = new XMLHttpRequest();
  request.open("GET", `${FAHLink}/countries/${countryId}`, false);
  request.setRequestHeader("Accept", "application/vnd.api+json");
  request.send();
  let response = null;
  if (request.status === 200) {
    response = JSON.parse(request.responseText);
  }
  return response;
}

export function fgetCountries(homicideRate) {
  const request = new XMLHttpRequest();
  let link = `${FAHLink}countries`;
  if (homicideRate != null) {
    link = `${link}?homicide_rate=${homicideRate}`;
  }
  request.open("GET", link, false);
  request.setRequestHeader("Accept", "application/vnd.api+json");
  request.send();
  let response = null;
  if (request.status === 200) {
    response = JSON.parse(request.responseText);
  }
  return response;
}

export function fgetCharity(charityId) {
  const request = new XMLHttpRequest();
  request.open("GET", `${FAHLink}/charities/${charityId}`, false);
  request.setRequestHeader("Accept", "application/vnd.api+json");
  request.send();
  let response = null;
  if (request.status === 200) {
    response = JSON.parse(request.responseText);
  }
  return response;
}

export function fgetCharities(donorRange) {
  const request = new XMLHttpRequest();
  let link = `${FAHLink}charities`;
  if (donorRange != null) {
    link = `${link}?total_donations=${donorRange}`;
  }
  request.open("GET", link, false);
  request.setRequestHeader("Accept", "application/vnd.api+json");
  request.send();
  let response = null;
  if (request.status === 200) {
    response = JSON.parse(request.responseText);
  }
  return response;
}

export function fgetArticle(newsId) {
  const request = new XMLHttpRequest();
  request.open("GET", `${FAHLink}/news/${newsId}`, false);
  request.setRequestHeader("Accept", "application/vnd.api+json");
  request.send();
  let response = null;
  if (request.status === 200) {
    response = JSON.parse(request.responseText);
  }
  return response;
}

export function fgetArticles(language) {
  const request = new XMLHttpRequest();
  let link = `${FAHLink}news`;
  if (language != null) {
    link = `${link}?language=${language}`;
  }
  request.open("GET", link, false);
  request.setRequestHeader("Accept", "application/vnd.api+json");
  request.send();
  let response = null;
  if (request.status === 200) {
    response = JSON.parse(request.responseText);
  }
  return response;
}
