/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
import {
  Container,
  Col,
  Pagination,
  Badge,
  NavDropdown,
} from "react-bootstrap";

export default function MyPagination(props) {
  const currentPage = props.currentPage;
  const totalPages = Math.ceil(props.totalInstances / props.numResults);
  let end = props.numResults * props.currentPage;
  const start = end - (props.numResults - 1);
  if (currentPage === totalPages) {
    end = props.totalInstances;
  }
  const numResultsOptions = [10, 15, 20, 25];
  const handleFirst = () => props.setCurrentPage(1);
  const handlePrev = () => props.setCurrentPage(currentPage - 1);
  const handleNext = () => props.setCurrentPage(currentPage + 1);
  const handleLast = () => props.setCurrentPage(totalPages);
  return (
    <Container>
      <Col className="d-flex justify-content-center">
        <Pagination>
          <Pagination.First disabled={currentPage <= 1} onClick={handleFirst} />
          <Pagination.Prev disabled={currentPage <= 1} onClick={handlePrev} />
          <Pagination.Item active>{currentPage}</Pagination.Item>
          <Pagination.Next
            disabled={currentPage >= totalPages}
            onClick={handleNext}
          />
          <Pagination.Last
            disabled={currentPage >= totalPages}
            onClick={handleLast}
          />
        </Pagination>
      </Col>
      <Col className="d-flex justify-content-center">
        <Badge pill bg="light" text="dark">
          {start}–{end} of {props.totalInstances} | Page {currentPage} of{" "}
          {totalPages}
        </Badge>
      </Col>
      <Col className="d-flex justify-content-center">
        <NavDropdown
          id="nav-dropdown-dark-example"
          title="# per page"
          menuVariant="dark"
        >
          {numResultsOptions.map((num) => (
            <NavDropdown.Item onClick={() => props.setNumResults(num)}>
              {num}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      </Col>
    </Container>
  );
}
