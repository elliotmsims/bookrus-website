/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import About from "./AboutPage";

test("About page renders", () => {
  render(<About />);
});
