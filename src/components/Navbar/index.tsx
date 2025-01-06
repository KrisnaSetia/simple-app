import { useRouter } from "next/router";
import { useState } from "react";
import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "next/image";
import logo from "@/../public/assets/telkomsel.png";
import style from "@/components/Navbar/Navbar.module.css";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

function NavScrollExample() {
  const { push } = useRouter();
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [loadingAccount, setLoadingAccount] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const handleCloseLogut = () => setShowLogout(false);
  const handleShowLogout = () => setShowLogout(true);
  const handleCloseAccount = () => setShowAccount(false);
  const handleShowAccount = () => setShowAccount(true);
  const handleClickLogout = () => {
    setLoadingLogout(true);
    setTimeout(() => {
      setLoadingLogout(false);
      push("/");
    }, 1000);
  };
  const handleClickAccount = () => {
    setLoadingAccount(true);
    setTimeout(() => {
      setLoadingAccount(false);
      push("/auth/login");
    }, 1000);
  };
  return (
    <>
      <Navbar expand="lg" className={style.navbar}>
        <Container fluid>
          <Navbar.Brand href="/home">
            <Image src={logo} alt="logo" className={style.logo} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <strong>
                <Nav.Link href="/home">Main Dashboard</Nav.Link>
              </strong>
              <NavDropdown title="Level Report" id="basic-nav-dropdown">
                <NavDropdown.Item href="/map/sitemap">Site</NavDropdown.Item>
                <NavDropdown.Item href="/map/citymap">City</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Regional</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleShowAccount}>
                  Change Account
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleShowLogout}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-danger">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={showAccount} onHide={handleCloseAccount}>
        <Modal.Header closeButton>
          <Modal.Title>Change Account Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to change your account ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAccount}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={handleClickAccount}
            disabled={loadingAccount}
          >
            {loadingAccount ? (
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
              "Yes"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showLogout} onHide={handleCloseLogut}>
        <Modal.Header closeButton>
          <Modal.Title>Log out Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogut}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={handleClickLogout}
            disabled={loadingLogout}
          >
            {loadingLogout ? (
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
              "Yes"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NavScrollExample;
