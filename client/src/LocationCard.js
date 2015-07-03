import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const LocationCard = ({ location }) => {
  const handleButtonClick = () => {
    window.location.href = `https://www.google.co.uk/search?q=${location.name}`;
  };

  return (
    <Card
      style={{ width: "18rem", margin: "10px" }}
      className="transparent"
      data-testid="locationCard"
    >
      <Card.Body>
        <Card.Title>{location.name}</Card.Title>
        <Card.Text>Latitude: {location.latitude}</Card.Text>
        <Card.Text>Longitude: {location.longitude}</Card.Text>
        <Button variant="primary" onClick={handleButtonClick}>
          Tell me more!
        </Button>
      </Card.Body>
    </Card>
  );
};
