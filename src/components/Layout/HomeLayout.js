import React from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "components/Footer/Footer";
import NavBar from "components/Navbar/NavBar";
import Home from "views/Home";
import PrivateRoute from "components/PrivateRoute";
import Profile from "views/Profile";
import FormDetail from "views/FormDetail";
import Page404 from "views/404";
import FormAnswers from "views/FormAnswers";

const HomeLayout = (props) => {
  const { forms, setForms, setIsBusy } = props;
  // const [isSuccessCreateForm, setIsSuccessCreateForm] = useState(false);

  // if (isSuccessCreateForm) {
  //   return <Redirect to="/your-new-location" push />;
  // }

  return (
    <div className="wrapper">
      <div className="main-panel">
        <NavBar forms={forms} setForms={setForms} setIsBusy={setIsBusy} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Home forms={forms} setForms={setForms} />}
          />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute
            exact
            path="/form/:formId"
            render={(props) => {
              const formId = props.match.params.formId;
              return <FormDetail formId={formId} forms={forms} />;
            }}
          />
          <PrivateRoute
            exact
            path="/form/answers/:formAnswerLink"
            component={FormAnswers}
          />
          <PrivateRoute
            exact
            path="/form/:formId/answers/"
            component={FormAnswers}
          />
          <Route component={Page404} />
        </Switch>
        <Footer fluid />
      </div>
    </div>
  );
};

export default HomeLayout;
