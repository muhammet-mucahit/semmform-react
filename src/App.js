import "App.css";
import React, { useEffect, useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import Loading from "components/Loading";
import history from "utils/history";
import HomeLayout from "components/Layout/HomeLayout";
import NotificationAlert from "react-notification-alert";
import notificationRef from "utils/notification";
import { useAuth0 } from "react-auth0-spa";
import API_Config from "api_config.json";
import axios from "axios";

const App = () => {
  const { loading, isAuthenticated } = useAuth0();
  const [forms, setForms] = useState([]);
  const [isBusy, setIsBusy] = useState(false);
  const { getTokenSilently } = useAuth0();

  useEffect(() => {
    const getUserForms = async () => {
      setIsBusy(true);
      const api = API_Config.url;
      const token = await getTokenSilently();
      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      await axios
        .get(`${api}/forms`, {
          headers: headers,
        })
        .then((response) => {
          setForms(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      setIsBusy(false);
    };
    if (isAuthenticated) {
      getUserForms();
    } else {
      setForms([]);
      setIsBusy(false);
    }
  }, [isAuthenticated, getTokenSilently]);

  if (loading || isBusy) {
    return <Loading />;
  }

  return (
    <>
      <div className="react-notification-alert-container">
        <NotificationAlert ref={notificationRef} />
      </div>
      <Router history={history}>
        <Switch>
          <Route
            path="/"
            render={() => (
              <HomeLayout
                forms={forms}
                setForms={setForms}
                setIsBusy={setIsBusy}
              />
            )}
          />
        </Switch>
      </Router>
    </>
  );
};

export default App;
