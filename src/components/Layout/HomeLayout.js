import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Footer from "components/Footer/Footer";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Home from "views/Home";
import PrivateRoute from "components/PrivateRoute";
import Profile from "views/Profile";
import Form from "views/Form";
import SemmApi from "views/Api";

const HomeLayout = (props) => {
  return (
    <div className="wrapper">
      <div className="main-panel">
        <AdminNavbar {...props} />
        <Switch>
          <Route exact path="/home" component={Home} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <Route exact path="/form/:formId" component={Form} />
          <PrivateRoute path="/external-api" component={SemmApi} />
          <Redirect from="*" to="/home" />
        </Switch>
        <Footer fluid />
      </div>
    </div>
  );
};

export default HomeLayout;
