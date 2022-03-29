import { useState, useEffect } from "react";
import axios from "axios";

export default function getCountries() {
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
