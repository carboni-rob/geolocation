import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { LocationCard } from "../LocationCard";

const defaultProps = {
  location: {
    name: "test location",
    latitude: "234.120",
    longitude: "-112.90",
  },
};

describe("LocationCard", () => {
  it("should render", () => {
    render(<LocationCard {...defaultProps} />);
  });

  it("should render the name", () => {
    render(<LocationCard {...defaultProps} />);

    screen.getByText(/test location/);
  });

  it("should render lat and long", () => {
    render(<LocationCard {...defaultProps} />);

    screen.getByText(/234.120/);
    screen.getByText(/-112.90/);
  });

  it("should render the button", () => {
    render(<LocationCard {...defaultProps} />);

    screen.getByRole("button", { name: "Tell me more!" });
  });
});
