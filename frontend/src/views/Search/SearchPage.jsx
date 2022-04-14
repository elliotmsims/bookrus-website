import { Container } from "react-bootstrap";
import { useState } from "react";
import { getCountries } from "../../services/API/apiCalls";
import ModelNavigation from "../../components/model-navigation/NavBar";

export default function Search() {
  const [currentPage, setCurrentPage] = useState(1);
  // const [searchCountries, setSearchCountries] = useState(null);
  const response = getCountries(currentPage);
  const totalInstances = response.meta_total;
  //   const countries = response.data;
  //   const navigate = useNavigate();
  //   const handleClick = (id) => navigate(`/countries/${id}`);
  return (
    <div className="Search Results">
      <br />
      <Container fluid>
        <ModelNavigation
          model="Search Results"
          totalInstances={totalInstances}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Container>
    </div>
  );
}
