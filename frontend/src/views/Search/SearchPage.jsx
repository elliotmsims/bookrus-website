import { Container } from "react-bootstrap";
import { useState } from "react";
import { getCountries } from "../../services/API/apiCalls";
import SearchNavigation from "../../components/search-naviagtion/NavBar";

export default function Search() {
  const [globalSearch, setGlobalSearch] = useState(null);
  return (
    <div className="Search Results">
      <br />
      <Container fluid>
        <SearchNavigation
          modelName="Search Results"
          placeholder="Find Books, Authors, and Countries"
          setSearch={setGlobalSearch}
        />
      </Container>
    </div>
  );
}
