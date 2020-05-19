import React from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "components/Footer/Footer";
import NavBar from "components/Navbar/NavBar";
import Home from "views/Home";
import PrivateRoute from "components/PrivateRoute";
import Profile from "views/Profile";
import FormDetail from "views/FormDetail";
import SemmApi from "views/Api";
import Page404 from "views/404";
import NewForm from "views/NewForm";
import FormAnswers from "views/FormAnswers";

const HomeLayout = () => {
  return (
    <div className="wrapper">
      <div className="main-panel">
        <NavBar />
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/form/new" component={NewForm} />
          <PrivateRoute exact path="/form/:formId" component={FormDetail} />
          <PrivateRoute exact path="/form/answers/:formAnswerLink" component={FormAnswers} />
          <Route exact path="/form/:formId/answers/" component={FormAnswers} />
          <PrivateRoute exact path="/external-api" component={SemmApi} />
          <Route component={Page404} />
        </Switch>
        <Footer fluid />
      </div>
    </div>
  );
};

export default HomeLayout;
