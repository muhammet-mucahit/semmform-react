import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import Home from "./views/Home";
import Profile from "./views/Profile";
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";
import AdminNavbar from "./components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
import HomeLayout from "./components/Layout/HomeLayout";
initFontAwesome();

const App = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={HomeLayout} />
      </Switch>
    </Router>
  );
};

export default App;
