import { useState, useEffect } from "react";
import axios from "axios";

export default function getBook(bookId) {
  const [book, setBook] = useState(0);
  useEffect(() => {
    const get = async () => {
      await axios
        .get(`https://api.bookrus.me/book/${bookId}`, {
          headers: { Accept: "application/vnd.api+json" },
        })
        .then((response) => setBook(response.data.data.attributes));
    };
    get();
  }, [bookId]);
  return book;
}
