/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
import { Container, Col, Row, Pagination, Badge } from "react-bootstrap";

export default function SearchPagination(props) {
  const currentPage = props.currentPage;
  const totalPages = Math.ceil(props.totalInstances / 10);
  let end = 10 * props.currentPage;
  const start = end - 9;
  if (currentPage === totalPages) {
    end = props.totalInstances;
  }
  const handleFirst = () => props.setCurrentPage(1);
  const handlePrev = () => props.setCurrentPage(currentPage - 1);
  const handleNext = () => props.setCurrentPage(currentPage + 1);
  const handleLast = () => props.setCurrentPage(totalPages);
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs lg="2">
          <Pagination size="sm">
            <Pagination.First
              disabled={currentPage <= 1}
              onClick={handleFirst}
            />
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
        <Col md="auto"> </Col>
        <Col xs lg="2">
          <Badge pill bg="dark" text="light">
            {start}–{end} of {props.totalInstances} | Page {currentPage} of{" "}
            {totalPages}
          </Badge>
        </Col>
      </Row>
    </Container>
  );
}
