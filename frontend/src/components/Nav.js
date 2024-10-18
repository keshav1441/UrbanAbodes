// cspell:disable
import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import "../styles/Nav.css";

const Nav = () => {
  const location = useLocation();

  const getNavbarClass = () => {
    switch (location.pathname) {
      case "/":
        return "navbar navbar-expand-lg navbar-light fixed-top";
      case "/signup":
        return "navbar navbar-expand-lg navbar-light navbar-auth fixed-top";
      case "/login":
        return "navbar navbar-expand-lg navbar-light navbar-auth fixed-top";
      case "/form2":
        return "navbar navbar-expand-lg navbar-light navbar-auth fixed-top";
      default:
        return "navbar navbar-expand-lg navbar-light bg-default fixed-top";
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className={getNavbarClass()}>
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link"
                style={{ cursor: "pointer" }}
                onClick={scrollToTop}
              >
                <HomeIcon style={{ color: "#ffffff" }} />
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link"
                style={{ cursor: "pointer", color: "#ffffff" }}
                onClick={scrollToTop}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <ScrollLink
                to="about"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="nav-link"
                style={{ cursor: "pointer", color: "#ffffff" }}
              >
                About
              </ScrollLink>
            </li>
            <li className="nav-item">
              <ScrollLink
                to="services"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="nav-link"
                style={{ cursor: "pointer", color: "#ffffff" }}
              >
                Services
              </ScrollLink>
            </li>
            <li className="nav-item">
              <ScrollLink
                to="contact"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="nav-link"
                style={{ cursor: "pointer", color: "#ffffff" }}
              >
                Contact
              </ScrollLink>
            </li>
            <li className="nav-item">
              <ScrollLink
                to="help"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="nav-link"
                style={{ cursor: "pointer", color: "#ffffff" }}
              >
                Help
              </ScrollLink>
            </li>
          </ul>

          <ul className="navbar-nav d-flex align-items-center">
            <li className="nav-item">
              <Link
                to="/login"
                className="nav-link"
                style={{
                  cursor: "pointer",
                  fontWeight: "450",
                  color: "#ffffff",
                }}
              >
                Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Button
                variant="contained"
                component={Link}
                to="/signup"
                style={{
                  backgroundColor: "#AFD3E2",
                  color: "#000000",
                  fontWeight: "bold",
                }}
              >
                Join Now
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
