import React, { useState } from "react";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./LandingPage.module.css";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import telkomsel from "@/../public/assets/telkomsel.png";
import { useRouter } from "next/router";

const LandingPage = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true); // Aktifkan spinner
    setTimeout(() => {
      setLoading(false); // Matikan spinner (opsional jika navigasi cepat)
      push("/auth/login"); // Navigasi ke halaman login
    }, 2000); // Simulasi loading 2 detik
  };

  return (
      <Container fluid className={styles.landingPage}>
        <Row className={styles.cardBackground}>
          <Card className="text-center" style={{ border: "none" }}>
            <Card.Body>
              <Row className="align-items-center">
                <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
                  <Image
                    src={telkomsel}
                    alt="telkomsel"
                    width={125}
                    height={72.5}
                    className="justify-content-center align-items-center d-inline-block"
                  />
                </Col>
                <Col xs={12} md={8} className={styles.customCol}>
                  <Card.Title className={styles.title}>
                    Simple App Telkomsel Web
                  </Card.Title>
                </Col>
              </Row>
              <Card.Text>
                Selamat datang di website ini. Ini merupakan prototype simple
                untuk pembuatan website dashboard Telkomsel.
              </Card.Text>
              <Card.Text>
                <strong>Silahkan Mencoba!</strong>
              </Card.Text>
              <Button variant="danger" onClick={handleClick} disabled={loading}>
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    {" Loading..."}
                  </>
                ) : (
                  "Try Website"
                )}
              </Button>
            </Card.Body>
          </Card>
        </Row>
      </Container>
  );
};

export default LandingPage;
