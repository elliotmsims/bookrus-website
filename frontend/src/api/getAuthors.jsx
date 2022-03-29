import { useState, useEffect } from "react";
import axios from "axios";

export default function getAuthors() {
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
