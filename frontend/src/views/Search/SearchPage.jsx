import { Button, Container, Row, Tabs, Tab } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getBooks,
  getAuthors,
  getCountries,
} from "../../services/API/apiCalls";
import SearchNavigation from "../../components/search-naviagtion/NavBar";
import ModelTable from "../../components/model-table/ModelTable";
import SearchPagination from "../../components/SearchPagination.jsx/SearchPagination";
import { modelAttributes } from "../../util/constants/modelAttributes";

export default function Search() {
  const [currentPageB, setCurrentPageB] = useState(1);
  const [currentPageA, setCurrentPageA] = useState(1);
  const [currentPageC, setCurrentPageC] = useState(1);
  const [globalSearch, setGlobalSearch] = useState(null);
  const navigate = useNavigate();
  const models = {
    Books: {
      response: getBooks(currentPageB, null, null, globalSearch),
      attributes: modelAttributes.Books,
      handleClick: (id) => navigate(`/books/${id}`),
      currentPage: currentPageB,
      setCurrentPage: setCurrentPageB,
    },
    Authors: {
      response: getAuthors(currentPageA, null, null, globalSearch),
      attributes: modelAttributes.Authors,
      handleClick: (id) => navigate(`/authors/${id}`),
      currentPage: currentPageA,
      setCurrentPage: setCurrentPageA,
    },
    Countries: {
      response: getCountries(currentPageC, null, null, globalSearch),
      attributes: modelAttributes.Countries,
      handleClick: (id) => navigate(`/countries/${id}`),
      currentPage: currentPageC,
      setCurrentPage: setCurrentPageC,
    },
  };
  const totalInstances =
    models.Books.response.meta_total +
    models.Authors.response.meta_total +
    models.Countries.response.meta_total;
  return (
    <div className="Search Results">
      <br />
      <Container fluid>
        <SearchNavigation
          modelName="Search Results"
          placeholder="Find Anything"
          setSearch={setGlobalSearch}
          totalInstances={totalInstances}
        />
      </Container>
      <br />
      <Container>
        <Tabs
          defaultActiveKey="Books"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          {Object.keys(models).map((i) => (
            <Tab eventKey={i} title={i}>
              <ModelTable
                modelName={i}
                modelData={models[i].response.data}
                totalInstances={models[i].response.meta_total}
                handleClick={models[i].handleClick}
                searchModel={globalSearch}
                attributes={models[i].attributes}
              />
              {models[i].response.meta_total > 0 && (
                <SearchPagination
                  totalInstances={models[i].response.meta_total}
                  currentPage={models[i].currentPage}
                  setCurrentPage={models[i].setCurrentPage}
                />
              )}
            </Tab>
          ))}
        </Tabs>
      </Container>
    </div>
  );
}
