import { Container } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCountries } from "../../services/API/apiCalls";
import ModelCards from "../../components/model-cards/ModelCards";
import ModelNavigation from "../../components/model-navigation/NavBar";
import blankCountryPic from "../../assets/blankcountryimg.jpg";
import { modelAttributes } from "../../util/constants/modelAttributes";

export default function Countries() {
  const [currentPage, setCurrentPage] = useState(() => {
    const pageValue = localStorage.getItem("Countries-page-key");
    const numRegex = /[0-9]+/;
    if (pageValue) {
      const pageNum = numRegex.exec(pageValue);
      if (pageNum) {
        let pageNumInt = parseInt(pageNum, 10);
        if (pageNumInt < 1) {
          pageNumInt = 1;
        }

        return pageNumInt;
      }
    }

    return 1;
  });
  const [numResults, setNumResults] = useState(10);
  const [sortCountries, setSortCountries] = useState(
    localStorage.getItem("Countries-sort-key")
  );
  const [searchCountries, setSearchCountries] = useState(null);
  const response = getCountries(
    currentPage,
    numResults,
    sortCountries,
    searchCountries
  );
  const totalInstances = response.meta_total;
  const countries = response.data;
  const navigate = useNavigate();
  const handleClick = (id) => navigate(`/countries/${id}`);
  // eslint-disable-next-line camelcase
  const attributes = (({ country_name, ...o }) => o)(modelAttributes.Countries);
  return (
    <div className="Countries">
      <br />
      <Container fluid>
        <ModelNavigation
          modelName="Countries"
          setSort={setSortCountries}
          setSearch={setSearchCountries}
          totalInstances={totalInstances}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numResults={numResults}
          setNumResults={setNumResults}
        />
      </Container>
      <br />
      <ModelCards
        modelName="Countries"
        modelData={countries}
        totalInstances={totalInstances}
        blankPic={blankCountryPic}
        handleClick={handleClick}
        searchModel={searchCountries}
        attributes={attributes}
      />
    </div>
  );
}
