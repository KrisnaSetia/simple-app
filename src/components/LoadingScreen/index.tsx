import React from "react";
import { Spinner, Container } from "react-bootstrap";

const LoadingSpinner = () => {
  return (
    <Container
      fluid
      className="position-fixed top-0 start-0 h-100 w-100 d-flex flex-column align-items-center justify-content-center"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: 9999,
      }}
    >
      <Spinner
        animation="border"
        variant="danger"
        style={{
          width: "4rem",
          height: "4rem",
        }}
      />
      <span className="mt-3 fw-medium">Loading...</span>
    </Container>
  );
};

export default LoadingSpinner;
