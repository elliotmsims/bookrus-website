import { Container, Table } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthors } from "../../services/API/apiCalls";
import ModelNavigation from "../../components/model-navigation/NavBar";
import ModelTable from "../../components/model-table/ModelTable";
import { modelAttributes } from "../../util/constants/modelAttributes";

export default function Authors() {
  const [currentPage, setCurrentPage] = useState(1);
  const [numResults, setNumResults] = useState(10);
  const [sortAuthors, setSortAuthors] = useState(null);
  const [searchAuthors, setSearchAuthors] = useState(null);
  const response = getAuthors(
    currentPage,
    numResults,
    sortAuthors,
    searchAuthors
  );
  const totalInstances = response.meta_total;
  const authors = response.data;
  const navigate = useNavigate();
  const handleClick = (id) => navigate(`/authors/${id}`);
  const attributes = modelAttributes.Authors;
  return (
    <div className="Authors">
      <br />
      <Container fluid>
        <ModelNavigation
          modelName="Authors"
          setSort={setSortAuthors}
          setSearch={setSearchAuthors}
          totalInstances={totalInstances}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numResults={numResults}
          setNumResults={setNumResults}
        />
      </Container>
      <br />
      <ModelTable
        modelName="Authors"
        modelData={authors}
        totalInstances={totalInstances}
        handleClick={handleClick}
        searchModel={searchAuthors}
        attributes={attributes}
      />
    </div>
  );
}
