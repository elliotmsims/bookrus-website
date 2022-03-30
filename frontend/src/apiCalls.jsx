import { useState, useEffect } from "react";
import axios from "axios";

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

export function getCountries() {
  const [countries, setCountries] = useState(0);
  useEffect(() => {
    const get = async () => {
      await axios
        .get(`https://api.bookrus.me/country`, {
          headers: { Accept: "application/vnd.api+json" },
        })
        .then((response) => response.data)
        .then((data) => {
          setCountries(data.data);
        });
    };
    get();
  }, []);
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

export function getBooks() {
  const [books, setBooks] = useState(0);
  useEffect(() => {
    const get = async () => {
      await axios
        .get(`https://api.bookrus.me/book`, {
          headers: { Accept: "application/vnd.api+json" },
        })
        .then((response) => response.data)
        .then((data) => {
          setBooks(data.data);
        });
    };
    get();
  }, []);
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

export function getAuthors() {
  const [authors, setAuthors] = useState(0);
  useEffect(() => {
    const get = async () => {
      await axios
        .get(`https://api.bookrus.me/author`, {
          headers: { Accept: "application/vnd.api+json" },
        })
        .then((response) => response.data)
        .then((data) => {
          setAuthors(data.data);
        });
    };
    get();
  }, []);
  return authors;
}
