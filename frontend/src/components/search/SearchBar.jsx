/* eslint-disable react/destructuring-assignment */
import { Form, FormControl, Button } from "react-bootstrap";
import { useState } from "react";

export default function SearchBar(props) {
  const [value, setValue] = useState(null);
  return (
    <Form className="d-flex">
      <FormControl
        type="search"
        placeholder={props.placeholder}
        className="me-2"
        aria-label="Search"
        onChange={(e) => setValue(e.target.value)}
      />
      <Button variant="outline-light" onClick={() => props.setSearch(value)}>
        Search
      </Button>
    </Form>
  );
}
