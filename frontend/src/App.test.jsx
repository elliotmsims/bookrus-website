import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

test("App renders", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(
    screen.getByText(
      "Information about your favorite stories, all in one place"
    )
  ).toBeInTheDocument();
});

test("Home buttons are not disabled", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const buttonItems = screen.getAllByRole("button");
  buttonItems.forEach((button) => {
    expect(button).not.toBeDisabled();
  });
});

test("All link buttons are not disabled", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const buttonItems = screen.getAllByRole("link");
  buttonItems.forEach((button) => {
    expect(button).not.toBeDisabled();
  });
});
