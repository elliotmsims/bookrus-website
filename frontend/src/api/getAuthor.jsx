import { useState, useEffect } from "react";
import axios from "axios";

export default function getAuthor(authorId) {
  const [author, setAuthor] = useState(0);
  useEffect(() => {
    const get = async () => {
      await axios
        .get(`https://api.bookrus.me/author/${authorId}`, {
          headers: { Accept: "application/vnd.api+json" },
        })
        .then((response) => response.data)
        .then((data) => {
          setAuthor(data.data.attributes);
        });
    };
    get();
  }, [authorId]);
  return author;
}
