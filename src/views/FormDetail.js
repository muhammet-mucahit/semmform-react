import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  ButtonGroup,
  Form,
  Input,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  CustomInput,
  CardHeader,
} from "reactstrap";

import { notify } from "utils/notification";
import axios from "axios";
import Loading from "components/Loading";
import API_Config from "api_config.json";
import { useAuth0 } from "react-auth0-spa";
import SweetAlert from "react-bootstrap-sweetalert";
import Page404 from "views/404";
import { Link } from "react-router-dom";

const FormDetail = (props) => {
  const [form, setForm] = useState(null);
  const [isBusy, setIsBusy] = useState(true);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isBusyAnswers, setIsBusyAnswers] = useState(true);
  const [formElements, setFormElements] = useState([]);
  const [formAnswers, setFormAnswers] = useState([]);
  const [isAnswersPageActive, setIsAnswersPageActive] = useState(false);
  const { getTokenSilently } = useAuth0();
  const [sweetalertUpdate, setSweetalertUpdate] = useState(false);
  const {
    match: { params },
  } = props;

  const getFormDetail = async (id) => {
    const api = API_Config.url;
    const token = await getTokenSilently();

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    await axios
      .get(`${api}/forms/${id}`, {
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

  useEffect(() => {
    getFormDetail(params.formId);
  }, []);

  if (isBusy) {
    return <Loading />;
  }

  if (!form) {
    return <Page404 />;
  }

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
    let formId = params.formId;
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
      .post(`${api}/forms/${formId}/formfields/`, formElements, {
        headers: headers,
      })
      .then((response) => {
        notify("Form saved successfully..", "success");
      })
      .catch((error) => {
        notify(error, "danger");
        setIsBusy(false);
        console.error(error);
      });
  };

  const onClickExport = () => {
    toggle();
  };

  const toggle = () => {
    setSweetalertUpdate(!sweetalertUpdate);
  };

  const onClickQuestionsTab = () => {
    getFormDetail(params.formId);
    setIsAnswersPageActive(false);
  };

  const getFormAnswers = async (link) => {
    setIsBusyAnswers(true);
    const api = API_Config.url;
    const token = await getTokenSilently();

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    await axios
      .get(`${api}/forms/answers/answer/${link}`, {
        headers: headers,
      })
      .then((response) => {
        setFormAnswers(response.data);
        setIsBusyAnswers(false);
      })
      .catch((error) => {
        notify(error, "danger");
        setIsBusyAnswers(false);
        console.error(error);
      });
  };

  const onClickAnswersTab = () => {
    const link = form.answer_link_id;
    getFormAnswers(link);
    setIsAnswersPageActive(true);
  };

  const groupBy = (key) => (array) =>
    array.reduce((objectsByKeyValue, obj) => {
      const value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});

  const groupByQuestion = groupBy("question");
  let groupedAnswers = groupByQuestion(formAnswers);

  let answers = isBusyAnswers ? (
    <Loading />
  ) : (
    Object.values(groupedAnswers).map((question, i) => {
      const questionId = question[0].question;
      return (
        <Row key={i}>
          <Col md="12">
            <Card>
              <CardBody>
                <h4 key={i}>
                  {formElements.filter((e) => (e.id = questionId))[0].question}
                </h4>
                <ListGroup>
                  {Object.values(question).map((answer, i) => (
                    <ListGroupItem key={i}>
                      <label>{answer.answer}</label>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
      );
    })
  );

  return (
    <div className="content">
      <Row>
        <Col>
          <div className="text-center" style={{ marginBottom: "10px" }}>
            <ButtonGroup
              className="btn-group-toggle float-center"
              data-toggle="buttons"
            >
              <Button
                size="sm"
                onClick={onClickQuestionsTab}
                className={
                  isAnswersPageActive ? "btn-secondary" : "btn-warning"
                }
              >
                <input
                  defaultChecked
                  className="d-none"
                  name="options"
                  type="radio"
                />
                <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                  Questions
                </span>
                <span className="d-block d-sm-none">
                  <i className="tim-icons icon-single-02" />
                </span>
              </Button>
              <Button
                size="sm"
                onClick={onClickAnswersTab}
                className={
                  isAnswersPageActive ? "btn-warning" : "btn-secondary"
                }
              >
                <input className="d-none" name="options" type="radio" />
                <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                  Answers
                </span>
                <span className="d-block d-sm-none">
                  <i className="tim-icons icon-gift-2" />
                </span>
              </Button>
            </ButtonGroup>
          </div>
        </Col>
      </Row>
      <div className="form">
        {!isAnswersPageActive ? (
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
                      defaultValue={form.title}
                      className="inputText"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Description</label>
                    <Input
                      id="desc"
                      name="desc"
                      type="text"
                      defaultValue={form.description}
                      className="inputText"
                    />
                  </FormGroup>
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
                        id="question"
                        name="question"
                        placeholder="Question"
                        type="text"
                        className="inputText"
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        id="type"
                        name="type"
                        placeholder="Type"
                        type="select"
                        className="inputText"
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
                    <Col md="6">
                      <Button
                        onClick={onClickExport}
                        className="btn btn-block btn-info"
                      >
                        Export
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        ) : (
          <div>{answers}</div>
        )}
      </div>
      <SweetAlert
        success
        show={sweetalertUpdate}
        confirmBtnBsStyle="info"
        title="Share Link"
        onConfirm={toggle}
      >
        <Link target="_blank" to={"/form/answers/" + form.answer_link_id}>
          Form Link
        </Link>
      </SweetAlert>
    </div>
  );
};

export default FormDetail;
