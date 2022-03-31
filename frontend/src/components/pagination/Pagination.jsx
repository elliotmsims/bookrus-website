/* eslint-disable react/destructuring-assignment */
import Pagination from "react-bootstrap/Pagination";

export default function MyPagination(props) {
  const page = Math.floor(props.index / 10) + 1;
  const start = 1 + 10 * (page - 1);
  const end = 10 * page;
  return (
    <>
      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item active>{props.index}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
      <div>
        <p>
          {start}–{end} of {props.total} | Page {page} of {props.totalPage}
        </p>
      </div>
    </>
  );
}
