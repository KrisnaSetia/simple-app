import React from "react";
import { Spinner, Container } from "react-bootstrap";
import style from "./Loading.module.css"

const LoadingSpinner = () => {
  return (
    <Container
      fluid
      className={style.loadingContainer}
    >
      <Spinner
        animation="border"
        variant="danger"
        className={style.spinner}
      />
      <span className={style.spinnerContent}>Loading...</span>
    </Container>
  );
};

export default LoadingSpinner;
