import { useState, useEffect } from "react";
import axios from "axios";

export default function getCountry(countryId) {
  const [country, setCountry] = useState(0);
  useEffect(() => {
    const get = async () => {
      await axios
        .get(`https://api.bookrus.me/country/${countryId}`, {
          headers: { Accept: "application/vnd.api+json" },
        })
        .then((response) => setCountry(response.data.data.attributes));
    };
    get();
  }, [countryId]);
  return country;
}
