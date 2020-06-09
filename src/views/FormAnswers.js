import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Button,
  CardHeader,
  ButtonGroup,
} from "reactstrap";

import { notify } from "utils/notification";
import axios from "axios";
import Loading from "components/Loading";
import API_Config from "api_config.json";
import { useAuth0 } from "react-auth0-spa";
import Page404 from "views/404";
import { Redirect } from "react-router-dom";
import loading from "assets/loading.svg";

const FormAnswers = (props) => {
  const [cSelected, setCSelected] = useState([]);
  const [rSelected, setRSelected] = useState([]);
  const [form, setForm] = useState(null);
  const [isBusy, setIsBusy] = useState(true);
  const [formElements, setFormElements] = useState([]);
  const [onSuccessFormSubmit, setOnSuccessFormSubmit] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(true);
  const { getTokenSilently } = useAuth0();
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
    setIsFormSubmitted(false);
    event.preventDefault();
    const data = new FormData(event.target);
    const token = await getTokenSilently();

    if (cSelected.length > 0) {
      cSelected.forEach((element) => {
        data.set(element.id, element.answer);
      });
    }
    if (rSelected.length > 0) {
      rSelected.forEach((element) => {
        data.set(element.id, element.answer);
      });
    }

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    const link = params.formAnswerLink;

    await axios
      .post(`${API_Config.url}/forms/answers/answer/${link}/`, data, {
        headers: headers,
      })
      .then(() => {
        notify("The answers sent successfully!", "info");
        setOnSuccessFormSubmit(true);
      })
      .catch((error) => {
        notify(error, "danger");
        console.error(error);
      });
    setIsFormSubmitted(true);
  };

  const onCheckboxBtnClick = (selectedLabel, id) => {
    let item = cSelected.filter((f) => f.id === id);
    if (item.length > 0) {
      item = item[0];
      const index = item.answer.indexOf(selectedLabel);
      if (index < 0) {
        item.answer.push(selectedLabel);
      } else {
        item.answer.splice(index, 1);
      }
    } else {
      cSelected.push({
        id: id,
        answer: [selectedLabel],
      });
    }
    setCSelected([...cSelected]);
    console.log(cSelected);
  };

  const onRadioBtnClick = (selectedLabel, id) => {
    let item = rSelected.filter((f) => f.id === id);
    if (item.length > 0) {
      item = item[0];
      item.answer = selectedLabel;
    } else {
      rSelected.push({
        id: id,
        answer: selectedLabel,
      });
    }
    setRSelected([...rSelected]);
  };

  let items = formElements.map((element, i) => {
    const name = element.id;
    switch (element.type) {
      case "Short Answer":
        return (
          <Card key={i}>
            <CardBody>
              <FormGroup>
                <h5>
                  {element.question} {element.is_required ? " *" : ""}
                </h5>
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
                <h5>
                  {element.question} {element.is_required ? " *" : ""}
                </h5>
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
      case "Date":
        return (
          <Card key={i}>
            <CardBody>
              <FormGroup>
                <h5>
                  {element.question} {element.is_required ? " *" : ""}
                </h5>
                <Input
                  id="answer"
                  name={name}
                  type="date"
                  className="inputText"
                  required={element.is_required}
                />
              </FormGroup>
            </CardBody>
          </Card>
        );
      case "Time":
        return (
          <Card key={i}>
            <CardBody>
              <FormGroup>
                <h5>
                  {element.question} {element.is_required ? " *" : ""}
                </h5>
                <Input
                  id="answer"
                  name={name}
                  type="time"
                  className="inputText"
                  required={element.is_required}
                />
              </FormGroup>
            </CardBody>
          </Card>
        );
      case "Checkboxes":
        return (
          <Card key={i}>
            <CardBody>
              <FormGroup>
                <h5>
                  {element.question} {element.is_required ? " *" : ""}
                </h5>
                <ButtonGroup required={element.is_required}>
                  {element.option_values.map((label, i) => (
                    <Button
                      key={i}
                      color="primary"
                      onClick={() => onCheckboxBtnClick(label, name)}
                      active={
                        cSelected.filter(
                          (c) => c.id === name && c.answer.includes(label)
                        ).length > 0
                      }
                    >
                      {label}
                    </Button>
                  ))}
                </ButtonGroup>
              </FormGroup>
            </CardBody>
          </Card>
        );
      case "Multiple Choice":
        return (
          <Card key={i}>
            <CardBody>
              <FormGroup required={element.is_required}>
                <h5>
                  {element.question} {element.is_required ? " *" : ""}
                </h5>
                <ButtonGroup required={element.is_required}>
                  {element.option_values.map((label, i) => (
                    <Button
                      key={i}
                      color="danger"
                      onClick={() => onRadioBtnClick(label, name)}
                      active={
                        rSelected.filter(
                          (r) => r.id === name && r.answer === label
                        ).length > 0
                      }
                    >
                      {label}
                    </Button>
                  ))}
                </ButtonGroup>
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
              {isFormSubmitted ? (
                <Button>Submit</Button>
              ) : (
                <Button disabled>
                  <img height="20px" src={loading} alt="loading" />
                </Button>
              )}
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FormAnswers;
