/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Countries from "./CountriesPage";

// Mock based on https://github.com/testing-library/react-hooks-testing-library/issues/588
const mockUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));

test("Countries page renders", () => {
  render(<Countries />);
});
