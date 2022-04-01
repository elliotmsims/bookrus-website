import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Authors from "./AuthorsPage";

// Mock based on https://github.com/testing-library/react-hooks-testing-library/issues/588
const mockUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUsedNavigate,
}));

test("Authors page renders", () => {
  render(<Authors />);
});
