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

export function getCountries(
  index,
  sort,
  countryName = null,
  countryRegion = null,
  countryCapitalCity = null,
  countryDescription = null,
  countryLanguages = null,
  search = null
) {
  const request = new XMLHttpRequest();
  const link = testing ? localLink : deployLink;
  let url = `${link}/countries?page=${index}`;
  if (search != null) {
    url += `&search=${search}`;
  } else {
    if (countryName != null) {
      url += `&countryName=${countryName}`;
    }
    if (countryRegion != null) {
      url += `&countryRegion=${countryRegion}`;
    }
    if (countryCapitalCity != null) {
      url += `&countryCapitalCity=${countryCapitalCity}`;
    }
    if (countryDescription != null) {
      url += `&countryDescription=${countryDescription}`;
    }
    if (countryLanguages != null) {
      url += `&countryLanguages=${countryLanguages}`;
    }
  }
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

export function getBooks(
  index,
  sort,
  bookTitle = null,
  bookAuthor = null,
  bookPages = null,
  bookMaturity = null,
  bookDescription = null,
  bookCategory = null,
  search = null
) {
  const request = new XMLHttpRequest();
  const link = testing ? localLink : deployLink;
  let url = `${link}/books?page=${index}`;
  if (search != null) {
    url += `&search=${search}`;
  } else {
    if (bookTitle != null) {
      url += `&book_title=${bookTitle}`;
    }
    if (bookAuthor != null) {
      url += `&book_author=${bookAuthor}`;
    }
    if (bookPages != null) {
      url += `&book_pages=${bookPages}`;
    }
    if (bookMaturity != null) {
      url += `&book_maturity=${bookMaturity}`;
    }
    if (bookDescription != null) {
      url += `&book_description=${bookDescription}`;
    }
    if (bookCategory != null) {
      url += `&book_category=${bookCategory}`;
    }
  }
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

// export function getAuthors(index, sort) {
//   const request = new XMLHttpRequest();
//   const link = testing ? localLink : deployLink;
//   let url = `${link}/authors?page=${index}`;
//   if (sort != null) {
//     url += `&sort=${sort}`;
//   }
//   request.open("GET", url, false);
//   request.setRequestHeader("Accept", "application/vnd.api+json");
//   request.send();
//   let response = null;
//   if (request.status === 200) {
//     response = JSON.parse(request.responseText);
//   }
//   return response;
// }

export function getAuthors(
  index,
  sort,
  authorName = null,
  authorNationality = null,
  authorGenre = null,
  authorWorkCount = null,
  authorBio = null,
  search = null
) {
  const request = new XMLHttpRequest();
  const link = testing ? localLink : deployLink;
  let url = `${link}/authors?page=${index}`;
  if (search != null) {
    url += `&search=${search}`;
  } else {
    if (authorName != null) {
      url += `&author_name=${authorName}`;
    }
    if (authorNationality != null) {
      url += `&author_nationality=${authorNationality}`;
    }
    if (authorGenre != null) {
      url += `&author_genre=${authorGenre}`;
    }
    if (authorWorkCount != null) {
      url += `&author_work_count=${authorWorkCount}`;
    }
    if (authorBio != null) {
      url += `&author_bio=${authorBio}`;
    }
  }
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
