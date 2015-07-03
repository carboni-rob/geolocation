import React from "react";
import { fireEvent, render, screen, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { NavBar } from "../NavBar";
import axios from "axios";

jest.mock("axios");

const dummyData = [
  { name: "test location", latitude: "234.120", longitude: "-112.90" },
];

const setLocations = jest.fn();

const defaultProps = {
  setLocations,
};

describe("NavBar", () => {
  it("should render", () => {
    render(<NavBar {...defaultProps} />);
  });

  it("shoud render the medicspot logo", () => {
    render(<NavBar {...defaultProps} />);

    screen.getByAltText(/Medicspot logo/);
  });

  it("shoud render the search input", () => {
    render(<NavBar {...defaultProps} />);

    screen.getByPlaceholderText(/Start typing to search/);
  });

  it("shoud not render the spinner", () => {
    render(<NavBar {...defaultProps} />);

    expect(screen.queryByTestId(/spinner/)).not.toBeInTheDocument();
  });

  it("shoud not render the alert", () => {
    render(<NavBar {...defaultProps} />);

    expect(screen.queryByText(/An error occurred/)).not.toBeInTheDocument();
  });

  it("shoud render the name", () => {
    render(<NavBar {...defaultProps} />);

    screen.getByText(/Roberto Carboni/);
  });

  it("shoud render the LinkedIn logo", () => {
    render(<NavBar {...defaultProps} />);

    screen.getByAltText(/LinkedIn/);
  });

  it("shoud render the GitHub logo", () => {
    render(<NavBar {...defaultProps} />);

    screen.getByAltText(/GitHub/);
  });

  it("should call axios.get and setLocations on input change", async () => {
    render(<NavBar {...defaultProps} />);
    const searchBox = screen.getByPlaceholderText(/Start typing to search/);

    fireEvent.change(searchBox, { target: { value: "test" } });

    expect(searchBox.value).toBe("test");
    expect(axios.get).not.toBeCalled();
    setTimeout(() => {
      expect(axios.get).toBeCalledTimes(1);
      expect(setLocations).toBeCalledTimes(1);
      expect(setLocations).toBeCalledWith(dummyData);
    }, 400);
  });

  it("should show the spinner while making the call", async () => {
    render(<NavBar {...defaultProps} />);
    const searchBox = screen.getByPlaceholderText(/Start typing to search/);

    fireEvent.change(searchBox, { target: { value: "test" } });

    expect(screen.getByTestId(/spinner/)).toBeInTheDocument();
  });

  it("should reset locations list when query term is shorter than 2 chars", async () => {
    render(<NavBar {...defaultProps} />);
    const searchBox = screen.getByPlaceholderText(/Start typing to search/);

    fireEvent.change(searchBox, { target: { value: "test" } });
    fireEvent.change(searchBox, { target: { value: "t" } });

    expect(setLocations).toBeCalledTimes(1);
    expect(setLocations).toBeCalledWith([]);
  });

  it("should show the alert when axios.get returns an error", async () => {
    const axiosErrorResponse = {
      status: 404,
      statusText: "Not Found",
      config: {},
      headers: {},
    };
    const axiosError = jest.fn(() => Promise.resolve(axiosErrorResponse));
    const axios = { get: axiosError };

    render(<NavBar {...defaultProps} />);
    const searchBox = screen.getByPlaceholderText(/Start typing to search/);

    fireEvent.change(searchBox, { target: { value: "test" } });

    setTimeout(() => {
      expect(screen.getByText(/An error occurred/)).toBeInTheDocument();
    }, 400);
  });
});
