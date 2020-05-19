import React, { useState, useEffect } from "react";
import {
  // Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Button,
  CardHeader,
} from "reactstrap";

import { notify } from "utils/notification";
import axios from "axios";
import Loading from "components/Loading";
import API_Config from "api_config.json";
import { useAuth0 } from "react-auth0-spa";
// import SweetAlert from "react-bootstrap-sweetalert";
import Page404 from "views/404";
import { Redirect } from "react-router-dom";

const FormAnswers = (props) => {
  const [form, setForm] = useState(null);
  const [isBusy, setIsBusy] = useState(true);
  const [formElements, setFormElements] = useState([]);
  const [onSuccessFormSubmit, setOnSuccessFormSubmit] = useState(false);
  const { getTokenSilently } = useAuth0();
  // const [sweetalertUpdate, setSweetalertUpdate] = useState(false);
  const {
    match: { params },
  } = props;

  useEffect(() => {
    const getFormDetail = async (answerLink) => {
      const api = API_Config.url;
      const token = await getTokenSilently();

      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      await axios
        .get(`${api}/forms/answers/${answerLink}`, {
          headers: headers,
        })
        .then((response) => {
          setForm(response.data);
          setFormElements(response.data.fields);
          setIsBusy(false);
        })
        .catch((error) => {
          notify(error, "danger");
          setIsBusy(false);
          console.error(error);
        });
    };
    getFormDetail(params.formAnswerLink);
  }, [getTokenSilently, params.formAnswerLink]);

  if (isBusy) {
    return <Loading />;
  }

  if (!form) {
    return <Page404 />;
  }

  if (onSuccessFormSubmit) {
    return <Redirect to="/" />;
  }

  const onFormSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const token = await getTokenSilently();

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    const link = params.formAnswerLink;

    await axios
      .post(`${API_Config.url}/forms/answers/answer/${link}/`, data, {
        headers: headers,
      })
      .then((response) => {
        notify("The answers sent successfully!", "info");
        setOnSuccessFormSubmit(true);
      })
      .catch((error) => {
        notify(error, "danger");
        console.error(error);
      });
  };

  let items = formElements.map((element, i) => {
    const name = element.id;
    switch (element.type) {
      case "Short Answer":
        return (
          <Card key={i}>
            <CardBody>
              <FormGroup>
                <h5>{element.question}</h5>
                <Input
                  id="answer"
                  name={name}
                  type="text"
                  className="inputText"
                  required={element.is_required}
                />
              </FormGroup>
            </CardBody>
          </Card>
        );
      case "Paragraph":
        return (
          <Card key={i}>
            <CardBody>
              <FormGroup>
                <h5>{element.question}</h5>
                <Input
                  id="answer"
                  name={name}
                  ows="4"
                  type="textarea"
                  className="inputText"
                  required={element.is_required}
                />
              </FormGroup>
            </CardBody>
          </Card>
        );
      default:
        return "";
    }
  });

  return (
    <div className="content">
      <div className="form">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="text-center">
                <h2>{form.title}</h2>
                <h5>{form.description}</h5>
              </CardHeader>
            </Card>
            <Form onSubmit={onFormSubmit}>
              {items}
              <Button type="submit">Submit</Button>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FormAnswers;
