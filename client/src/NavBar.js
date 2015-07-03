import React from "react";
import { Alert, Navbar, Form, FormControl, Spinner } from "react-bootstrap";
import axios from "axios";
import { debounce } from "lodash";
import linkedin_logo from "./linkedin_logo.png";
import github_logo from "./github_logo.png";

export const NavBar = ({ setLocations }) => {
  // state hooks
  const [query, setQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const executeQuery = React.useCallback(
    //use debounce to wait before making request
    debounce((value) => {
      //make get request
      axios
        .get(`/locations?q=${value}`)
        .then((response) => {
          // sort response data alphabetically
          const sortedLocations = response.data.sort((loc1, loc2) =>
            loc1.name > loc2.name ? 1 : -1
          );
          //populate the locations array
          setLocations(sortedLocations);
          // clear loading state
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          // if error has a response field, use it to display error info
          if (error.response) {
            return setError(error.response.status);
          }
          // if error hasn't a response field, just log the error
          setError("unknown");
          console.log(error);
        });
    }, 400),
    []
  );

  const handleChange = (value) => {
    // set the value for the controlled input
    setQuery(value);
    // perform the search only if the value is longer than 2 chars
    if (value.length >= 2) {
      // clear past error
      setError(false);
      // set loading state
      setLoading(true);
      // call search function
      executeQuery(value);
    } else {
      // clear locations array
      setLocations([]);
    }
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      sticky="top"
      className="transparent"
      data-testid="navBar"
    >
      <Navbar.Collapse id="basic-navbar-nav">
        <Form inline onSubmit={(event) => event.preventDefault()}>
          <FormControl
            type="text"
            placeholder="Start typing to search"
            className="mr-sm-2"
            value={query}
            onChange={(event) => handleChange(event.target.value)}
          />
          {loading && (
            <Spinner animation="grow" variant="primary" data-testid="spinner" />
          )}
        </Form>
        {error && (
          <Alert variant="danger" style={{ margin: "0" }}>
            Sorry! An error occurred while searching for locations. (Status
            code: {error})
          </Alert>
        )}
      </Navbar.Collapse>
      <h5 style={{ margin: 0, paddingRight: "10px" }}>Roberto Carboni</h5>
      <a
        href="https://www.linkedin.com/in/roberto-carboni/"
        style={{ paddingRight: "10px" }}
      >
        <img
          src={linkedin_logo}
          alt="LinkedIn logo"
          width="32"
          height="32"
        ></img>
      </a>
      <a href="https://github.com/carboni-rob">
        <img src={github_logo} alt="GitHub logo"></img>
      </a>
    </Navbar>
  );
};
