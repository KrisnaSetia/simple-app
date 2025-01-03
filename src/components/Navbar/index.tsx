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
function NavScrollExample() {
  return (
    <>
      <Navbar expand="lg" className={style.navbar}>
        <Container fluid>
          <Navbar.Brand href="#">
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
                <Nav.Link href="#action1">Dashboard</Nav.Link>
              </strong>
              <Nav.Link href="#action2">BTS Map</Nav.Link>
              <NavDropdown title="Statistics" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Profit</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Payload</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Other
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/4.1">Change Account</NavDropdown.Item>
                <NavDropdown.Item href="#action/4.2">Log Out</NavDropdown.Item>
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
    </>
  );
}

export default NavScrollExample;
