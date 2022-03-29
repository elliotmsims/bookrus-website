import { useState, useEffect } from "react";
import axios from "axios";

export default function getBooks() {
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
