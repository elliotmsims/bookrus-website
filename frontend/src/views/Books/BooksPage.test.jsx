/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Books from "./BooksPage";

// Mock based on https://github.com/testing-library/react-hooks-testing-library/issues/588
const mockUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));

test("Books page renders", () => {
  render(<Books />);
});
