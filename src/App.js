import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Loading from "components/Loading";
import history from "utils/history";
import HomeLayout from "components/Layout/HomeLayout";
import NotificationAlert from "react-notification-alert";
import notificationRef from "utils/notification";
import { useAuth0 } from "react-auth0-spa";

// styles
import "App.css";

const App = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="react-notification-alert-container">
        <NotificationAlert ref={notificationRef} />
      </div>
      <Router history={history}>
        <Switch>
          <Route path="/" component={HomeLayout} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
