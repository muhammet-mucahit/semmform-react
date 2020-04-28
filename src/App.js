import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Loading from "./components/Loading";
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";

// styles
import "./App.css";
import "./assets/css/style.css";

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
