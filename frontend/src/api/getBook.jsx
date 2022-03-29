import { useState, useEffect } from "react";
import axios from "axios";

export default function getBook(bookId) {
  const id = bookId + 1; // FIX THISSSSSSS
  const [book, setBook] = useState(0);
  useEffect(() => {
    const get = async () => {
      await axios
        .get(`https://api.bookrus.me/book/${id}`, {
          headers: { Accept: "application/vnd.api+json" },
        })
        .then((response) => response.data)
        .then((data) => {
          setBook(data.data.attributes);
        });
    };
    get();
  }, []);
  return book;
}
