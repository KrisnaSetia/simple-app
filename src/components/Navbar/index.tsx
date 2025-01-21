import { useRouter } from "next/router";
import { useState, FormEvent, useEffect } from "react";
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
  const [userData, setUserData] = useState<{
    username?: string;
    email?: string;
  } | null>(null);

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch user data saat komponen dimount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/user", {
          credentials: "include", // Penting untuk mengirim cookie
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleCloseLogut = () => setShowLogout(false);
  const handleShowLogout = () => setShowLogout(true);
  const handleCloseAccount = () => setShowAccount(false);
  const handleShowAccount = () => setShowAccount(true);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const currentPath = router.pathname;
    router.push({
      pathname: currentPath,
      query: { ...router.query, search: searchQuery },
    });
  };

  const handleClickLogout = async () => {
    try {
      setLoadingLogout(true);

      // Panggil API logout
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include", // Penting untuk mengirim cookie
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Redirect ke halaman login
      push("/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoadingLogout(false);
      setShowLogout(false);
    }
  };

  const handleClickAccount = async () => {
    try {
      setLoadingAccount(true);

      // Panggil API logout untuk menghapus session saat ini
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      // Redirect ke halaman login
      push("/auth/login");
    } catch (error) {
      console.error("Change account error:", error);
    } finally {
      setLoadingAccount(false);
      setShowAccount(false);
    }
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
                <NavDropdown.Item href="/map/regionmap">
                  Regional
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item
                  className="text-muted"
                  style={{ cursor: "default" }}
                  onClick={(e) => e.preventDefault()}
                >
                  User: {userData?.username || "Loading..."}
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="text-muted"
                  style={{ cursor: "default" }}
                  onClick={(e) => e.preventDefault()}
                >
                  Email: {userData?.email || "Loading..."}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleShowAccount}>
                  Change Account
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleShowLogout}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline-danger" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showAccount} onHide={handleCloseAccount}>
        <Modal.Header closeButton>
          <Modal.Title>Change Account Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to change your account?</Modal.Body>
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
