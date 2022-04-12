/* eslint-disable react/destructuring-assignment */
import { Form, FormControl, Button } from "react-bootstrap";

export default function SearchBar() {
  return (
    <Form className="d-flex">
      <FormControl
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
      />
      <Button variant="outline-light">Search</Button>
    </Form>
  );
}
