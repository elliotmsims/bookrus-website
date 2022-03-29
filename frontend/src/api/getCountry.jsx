import { useState, useEffect } from "react";
import axios from "axios";

export default function getCountry(countryId) {
  const id = countryId + 1; // FIX THISSSSSSS
  const [country, setCountry] = useState(0);
  useEffect(() => {
    const get = async () => {
      await axios
        .get(`https://api.bookrus.me/country/${id}`, {
          headers: { Accept: "application/vnd.api+json", 
          "Access-Control-Allow-Origin": "*" },
        })
        .then((response) => response.data)
        .then((data) => {
          setCountry(data.data.attributes);
        });
    };
    get();
  }, []);
  return country;
}
