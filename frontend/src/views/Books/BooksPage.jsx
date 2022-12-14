import { Container } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBooks } from "../../services/API/apiCalls";
import ModelNavigation from "../../components/model-navigation/NavBar";
import ModelCards from "../../components/model-cards/ModelCards";
import blankBookPic from "../../assets/blankbookimg.jpg";
import { modelAttributes } from "../../util/constants/modelAttributes";

export default function Books() {
  const [currentPage, setCurrentPage] = useState(() => {
    const pageValue = localStorage.getItem("Books-page-key");
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
  const [sortBooks, setSortBooks] = useState(
    localStorage.getItem("Books-sort-key")
  );
  const [searchBooks, setSearchBooks] = useState(null);
  const response = getBooks(currentPage, numResults, sortBooks, searchBooks);
  const totalInstances = response.meta_total;
  const books = response.data;
  const navigate = useNavigate();
  const handleClick = (id) => navigate(`/books/${id}`);
  // eslint-disable-next-line camelcase
  const attributes = (({ book_title, ...o }) => o)(modelAttributes.Books);
  return (
    <div className="Books">
      <br />
      <Container fluid>
        <ModelNavigation
          modelName="Books"
          setSort={setSortBooks}
          setSearch={setSearchBooks}
          totalInstances={totalInstances}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numResults={numResults}
          setNumResults={setNumResults}
        />
      </Container>
      <br />
      <ModelCards
        modelName="Books"
        modelData={books}
        totalInstances={totalInstances}
        blankPic={blankBookPic}
        handleClick={handleClick}
        searchModel={searchBooks}
        attributes={attributes}
      />
    </div>
  );
}
