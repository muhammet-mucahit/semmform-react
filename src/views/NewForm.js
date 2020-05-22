import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  CustomInput,
  CardHeader,
} from "reactstrap";

import { notify } from "utils/notification";
import axios from "axios";
import API_Config from "api_config.json";
import { useAuth0 } from "react-auth0-spa";
import { Redirect } from "react-router-dom";

const NewForm = () => {
  const [form, setForm] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [onSuccessFormSubmit, SetOnSuccessFormSubmit] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [formElements, setFormElements] = useState([]);
  const { getTokenSilently } = useAuth0();

  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    const question = data.get("question");
    const type = data.get("type");
    let isRequired = data.get("isRequired") === "on" ? true : false;

    setFormElements(
      formElements.concat({
        id: "_" + Math.random().toString(36).substr(2, 9),
        question: question,
        type: type,
        is_required: isRequired,
      })
    );
  };

  const onClickDeleteElement = (id) => {
    setFormElements(formElements.filter((e) => e.id !== id));
  };

  let items = formElements.map((element, i) => {
    switch (element.type) {
      case "Short Answer":
        return (
          <Card key={i}>
            <CardHeader>
              <Row>
                <Col md="10">
                  <h4>
                    {element.question} {element.is_required ? " *" : ""}
                  </h4>
                </Col>
                <Col md="2">
                  <Button
                    className="btn-danger"
                    size="sm"
                    style={{ float: "right" }}
                    onClick={() => onClickDeleteElement(element.id)}
                  >
                    X
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <FormGroup>
                <Input
                  id="answer"
                  name="answer"
                  type="text"
                  className="inputText"
                  disabled
                />
              </FormGroup>
            </CardBody>
          </Card>
        );
      case "Paragraph":
        return (
          <Card key={i}>
            <CardHeader>
              <Row>
                <Col md="10">
                  <h4>
                    {element.question} {element.is_required ? " *" : ""}
                  </h4>
                </Col>
                <Col md="2">
                  <Button
                    className="btn-danger"
                    size="sm"
                    style={{ float: "right" }}
                    onClick={() => onClickDeleteElement(element.id)}
                  >
                    X
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <FormGroup>
                <Input
                  id="answer"
                  name="answer"
                  ows="4"
                  type="textarea"
                  className="inputText"
                  disabled
                />
              </FormGroup>
            </CardBody>
          </Card>
        );
      case "Date":
        return (
          <Card key={i}>
            <CardHeader>
              <Row>
                <Col md="10">
                  <h4>
                    {element.question} {element.is_required ? " *" : ""}
                  </h4>
                </Col>
                <Col md="2">
                  <Button
                    className="btn-danger"
                    size="sm"
                    style={{ float: "right" }}
                    onClick={() => onClickDeleteElement(element.id)}
                  >
                    X
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <FormGroup>
                <Input
                  id="answer"
                  name="answer"
                  type="date"
                  className="inputText"
                  disabled
                />
              </FormGroup>
            </CardBody>
          </Card>
        );
      case "Time":
        return (
          <Card key={i}>
            <CardHeader>
              <Row>
                <Col md="10">
                  <h4>
                    {element.question} {element.is_required ? " *" : ""}
                  </h4>
                </Col>
                <Col md="2">
                  <Button
                    className="btn-danger"
                    size="sm"
                    style={{ float: "right" }}
                    onClick={() => onClickDeleteElement(element.id)}
                  >
                    X
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <FormGroup>
                <Input
                  id="answer"
                  name="answer"
                  type="time"
                  className="inputText"
                  disabled
                />
              </FormGroup>
            </CardBody>
          </Card>
        );
      default:
        return "";
    }
  });

  const onClickSave = async () => {
    const api = API_Config.url;
    const token = await getTokenSilently();

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    const data = {
      title: title,
      description: desc,
      fields: [],
    };

    data.fields = formElements;

    await axios
      .post(`${api}/new_form/`, data, {
        headers: headers,
      })
      .then((response) => {
        notify("Form saved successfully..", "success");
        setForm(response.data);
        SetOnSuccessFormSubmit(true);
      })
      .catch((error) => {
        notify(error, "danger");
        console.error(error);
      });
  };

  if (onSuccessFormSubmit) {
    return <Redirect to={`/form/${form.id}`} />;
  }

  const onChangeElementType = () => {};

  return (
    <div className="content">
      <div className="form">
        <Row>
          <Col md="8">
            <Card>
              <CardBody>
                <FormGroup>
                  <label>Title</label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    className="inputText"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Description</label>
                  <Input
                    id="desc"
                    name="desc"
                    type="text"
                    className="inputText"
                    onChange={(e) => {
                      setDesc(e.target.value);
                    }}
                  />
                </FormGroup>
                <Button hidden type="submit"></Button>
              </CardBody>
            </Card>
            {items}
          </Col>
          <Col md="4">
            <Card className="card-user">
              <CardBody>
                <Form onSubmit={onSubmit}>
                  <FormGroup>
                    <Input
                      id="type"
                      name="type"
                      placeholder="Type"
                      type="select"
                      className="inputText"
                      onChange={onChangeElementType}
                    >
                      <option>Short Answer</option>
                      <option>Paragraph</option>
                      <option>Multiple Choice</option>
                      <option>Checkboxes</option>
                      <option>Dropdown</option>
                      <option>File Upload</option>
                      <option>Date</option>
                      <option>Time</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Input
                      id="question"
                      name="question"
                      placeholder="Question"
                      type="text"
                      className="inputText"
                      required
                    />
                  </FormGroup>
                  <FormGroup
                    style={{ visibility: { hidden } ? "hidden" : "visible" }}
                  >
                    <Row>
                      <Col md="9">
                        <Input
                          name="question"
                          placeholder="Option"
                          type="text"
                          className="inputText"
                        />
                      </Col>
                      <Col md="2">
                        <Button size="sm">+</Button>
                      </Col>
                    </Row>
                  </FormGroup>
                  <Row className="text-center">
                    <Col md="6">
                      <Button>Add</Button>
                    </Col>
                    <Col md="6">
                      <CustomInput
                        type="checkbox"
                        id="isRequired"
                        name="isRequired"
                        label="Required"
                      />
                    </Col>
                  </Row>
                </Form>
                <Row className="text-center">
                  <Col md="6">
                    <Button
                      onClick={onClickSave}
                      className="btn btn-block btn-primary"
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default NewForm;
