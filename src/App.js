import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
import NavBar from "./components/NavBar";
initFontAwesome();

const App = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div className="wrapper">
        <div className="main-panel" useRef="mainPanel">
          <NavBar />
          <Container>
            <Switch>
              <Route path="/" exact component={Home} />
              <PrivateRoute path="/profile" component={Profile} />
            </Switch>
          </Container>
          <Footer fluid />
        </div>
      </div>
    </Router>
  );
};

export default App;
