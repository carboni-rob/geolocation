import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  describe("at the default state", () => {
    it("should render", () => {
      render(<App />);
    });

    it("should contain the Navbar", () => {
      render(<App />);
      screen.getByTestId(/navBar/);
    });

    it("should contain the Jumbotron", () => {
      render(<App />);
      screen.getByTestId(/jumbotron/);
    });

    it("should not contain any LocationCards", () => {
      render(<App />);
      const card = screen.queryByTestId(/locationCard/);

      expect(card).not.toBeInTheDocument();
    });
  });
});
