import React, { useState } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { useAuth0 } from "react-auth0-spa";
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  InputGroup,
  Navbar,
  NavLink,
  Nav,
  NavItem,
  Container,
  Modal,
} from "reactstrap";

const NavBar = () => {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [modalSearch, setModalSearch] = useState(false);
  const toggleModalSearch = () => setModalSearch(!modalSearch);
  const toggleCollapse = () => setCollapseOpen(!collapseOpen);

  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  return (
    <>
      <Navbar className="navbar-absolute" expand="lg">
        <Container fluid>
          <button
            aria-expanded={false}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-target="#navigation"
            data-toggle="collapse"
            id="navigation"
            type="button"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </button>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to="/"
                  exact
                  activeClassName="router-link-exact-active"
                >
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to="/external-api"
                  exact
                  activeClassName="router-link-exact-active"
                >
                  API
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to="/form/new"
                  exact
                  activeClassName="router-link-exact-active"
                >
                  New Form
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
              {!isAuthenticated && (
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="primary"
                    className="btn-margin"
                    onClick={() => loginWithRedirect({})}
                  >
                    Log in
                  </Button>
                </NavItem>
              )}
              {isAuthenticated && (
                <>
                  <InputGroup className="search-bar">
                    <Button
                      color="link"
                      data-target="#searchModal"
                      data-toggle="modal"
                      id="search-button"
                      onClick={toggleModalSearch}
                    >
                      <i className="tim-icons icon-zoom-split" />
                      <span className="d-lg-none d-md-block">Search</span>
                    </Button>
                  </InputGroup>
                  <UncontrolledDropdown nav>
                    <DropdownToggle
                      caret
                      color="default"
                      data-toggle="dropdown"
                      nav
                      onClick={(e) => e.preventDefault()}
                    >
                      <div className="photo">
                        <img alt="..." src={user.picture} />
                      </div>
                      <b className="caret d-none d-lg-block d-xl-block" />
                      <p className="d-lg-none">Log out</p>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-navbar" right tag="ul">
                      <NavLink tag={RouterNavLink} to="/profile">
                        <DropdownItem className="nav-item">
                          Profile
                        </DropdownItem>
                      </NavLink>
                      <DropdownItem divider tag="li" />
                      <NavLink tag="li">
                        <DropdownItem
                          onClick={() => logoutWithRedirect()}
                          className="nav-item"
                        >
                          Log out
                        </DropdownItem>
                      </NavLink>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </>
              )}
              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      <Modal
        modalClassName="modal-search"
        isOpen={modalSearch}
        toggle={toggleModalSearch}
      >
        <div className="modal-header">
          <Input id="inlineFormInputGroup" placeholder="SEARCH" type="text" />
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={toggleModalSearch}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </div>
      </Modal>
    </>
  );
};

export default NavBar;
