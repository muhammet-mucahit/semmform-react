import React from "react";
import { Container, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container fluid>
          <Nav>
            <NavItem>
              <NavLink href="https://semm-academy.github.io/#courses">
                SEMM Academy
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://semm-academy.github.io/#about">
                About Us
              </NavLink>
            </NavItem>
          </Nav>
          <div className="copyright">
            © {new Date().getFullYear()} made with{" "}
            <i className="tim-icons icon-heart-2" /> by{" "}
            <a
              href="https://semm-academy.github.io/"
              rel="noopener noreferrer"
              target="_blank"
            >
              SEMM Academy
            </a>{" "}
          </div>
        </Container>
      </footer>
    );
  }
}

export default Footer;
