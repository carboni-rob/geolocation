import React from "react";
import "./App.css";
import { NavBar } from "./NavBar";
import { LocationCard } from "./LocationCard";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Jumbotron from "react-bootstrap/Jumbotron";

const App = () => {
  const [locations, setLocations] = React.useState([]);

  return (
    <div className="App">
      <NavBar setLocations={setLocations}></NavBar>
      <Container fluid>
        <Row>
          {!locations.length && (
            <div className=" transparent center">
              <Jumbotron data-testid="jumbotron">
                <h1>Hello, User!</h1>
                <p>
                  This React application will look for and display information
                  about Great Britain locations.
                </p>
                <h2>Just type something in the search box above to start.</h2>
              </Jumbotron>
            </div>
          )}
          {locations.map((location) => {
            return (
              <LocationCard key={location.geonameid} location={location} />
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default App;
