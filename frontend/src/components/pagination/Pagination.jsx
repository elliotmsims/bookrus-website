/* eslint-disable react/destructuring-assignment */
import Pagination from "react-bootstrap/Pagination";

export default function MyPagination(props) {
  // eslint-disable-next-line prefer-destructuring
  const currentPage = props.currentPage;
  const totalPages = Math.ceil(props.totalInstances / 10);
  const end = 10 * props.currentPage;
  const start = end - 9;
  const handleFirst = () => props.setCurrentPage(1);
  const handlePrev = () => props.setCurrentPage(currentPage - 1);
  const handleNext = () => props.setCurrentPage(currentPage + 1);
  const handleLast = () => props.setCurrentPage(totalPages);
  return (
    <>
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
      <div>
        <p>
          {start}–{end} of {props.totalInstances} | Page {currentPage} of{" "}
          {totalPages}
        </p>
      </div>
    </>
  );
}
