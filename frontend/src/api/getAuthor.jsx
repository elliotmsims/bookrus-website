import { useState, useEffect } from "react";
import axios from "axios";

export default function getAuthor(authorId) {
  const id = authorId + 1; // FIX THISSSSSSS
  const [author, setAuthor] = useState(0);
  useEffect(() => {
    const get = async () => {
      await axios
        .get(`https://api.bookrus.me/author/${id}`, {
          headers: { Accept: "application/vnd.api+json" },
        })
        .then((response) => response.data)
        .then((data) => {
          setAuthor(data.data.attributes);
        });
    };
    get();
  }, []);
  return author;
}
