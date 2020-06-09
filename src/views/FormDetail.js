import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import { notify } from "utils/notification";
import no_answer from "assets/no_answer.svg";
import { useAuth0 } from "react-auth0-spa";
import API_Config from "api_config.json";
import axios from "axios";
import loading from "assets/loading.svg";
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
  ButtonGroup,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import Loading from "components/Loading";

const FormDetail = (props) => {
  const [form, setForm] = useState({});
  const [isAnswersPageActive, setIsAnswersPageActive] = useState(false);
  const [isFieldAdded, setIsFieldAdded] = useState(true);
  const [hidden, setHidden] = useState(true);
  const [formFields, setFormFields] = useState([]);
  const [formAnswers, setFormAnswers] = useState([]);
  const [options, setOptions] = useState([]);
  const [sweetalertUpdate, setSweetalertUpdate] = useState(false);
  const { formId, forms } = props;
  const { getTokenSilently } = useAuth0();
  const [isBusyAnswers, setIsBusyAnswers] = useState(true);

  useEffect(() => {
    const currentFormId = parseInt(formId);
    const currentForm = forms.filter((f) => f.id === currentFormId)[0];
    setForm(currentForm);
    setFormFields(currentForm.fields);
    console.log(currentForm);
  }, [forms, formId]);

  const onClickQuestionsTab = () => {
    // getFormDetail(params.formId);
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
  ) : formAnswers.length > 0 ? (
    Object.values(groupedAnswers).map((question, i) => {
      const questionId = question[0].question;
      return (
        <Row key={i}>
          <Col md="12">
            <Card>
              <CardBody>
                <h4 key={i}>
                  {formFields.filter((e) => (e.id = questionId))[0] !==
                  undefined
                    ? formFields.filter((e) => (e.id = questionId))[0].question
                    : ""}
                  {/* {formFields.filter((e) => (e.id = questionId))[0].question} */}
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
  ) : (
    <Row>
      <Col md="12">
        <Card>
          <CardBody className="text-center">
            <img className="warning" src={no_answer} alt="No Answer" />
            <h4>There is no answer, yet!</h4>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );

  const addFormFieldApiRequest = async (data) => {
    const api = API_Config.url;
    const token = await getTokenSilently();

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    await axios
      .post(`${api}/forms/${form.id}/formfields/`, data, {
        headers: headers,
      })
      .then((response) => {
        const newFormFields = formFields.concat(response.data);
        setFormFields(newFormFields);
        form.fields = newFormFields;
        setForm(form);
        notify("The field added successfully", "success");
      })
      .catch((error) => {
        notify(error, "danger");
        console.error(error);
      });
    setIsFieldAdded(true);
  };

  const onSaveFormElement = (event) => {
    setIsFieldAdded(false);
    event.preventDefault();
    const data = new FormData(event.target);

    const question = data.get("question");
    const type = data.get("type");
    let isRequired = data.get("isRequired") === "on" ? true : false;

    let optionValues = [];
    if (type === "Checkboxes" || type === "Multiple Choice") {
      optionValues = [];
      for (var i = 0; i < 1000; i++) {
        if (!data.get("option_" + i)) break;
        const option = data.get("option_" + i);
        optionValues.push(option);
      }
    }

    const newFieldData = {
      question: question,
      option_values: optionValues,
      type: type,
      is_required: isRequired,
    };

    addFormFieldApiRequest(newFieldData);
  };

  const deleteFormFieldApiRequest = async (fieldId) => {
    const api = API_Config.url;
    const token = await getTokenSilently();

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    await axios
      .delete(`${api}/formfields/${fieldId}`, {
        headers: headers,
      })
      .catch((error) => {
        notify(error, "danger");
        console.error(error);
      });
  };

  const onClickDeleteElement = (id) => {
    const newFormFields = formFields.filter((e) => e.id !== id);
    setFormFields(newFormFields);
    form.fields = newFormFields;
    setForm(form);
    setFormAnswers(formAnswers.filter((f) => f.question !== id));
    notify("The field deleted successfully", "success");
    deleteFormFieldApiRequest(id);
  };

  let items = formFields.map((element, i) => {
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
      case "Checkboxes":
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
                {element.option_values.map((label, i) => (
                  <CustomInput
                    key={i}
                    type="checkbox"
                    id="answer"
                    name="answer"
                    label={label}
                    className="inputText"
                    disabled
                  />
                ))}
              </FormGroup>
            </CardBody>
          </Card>
        );
      case "Multiple Choice":
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
                {element.option_values.map((label, i) => (
                  <CustomInput
                    key={i}
                    type="radio"
                    id="answer"
                    name="answer"
                    label={label}
                    className="inputText"
                    disabled
                  />
                ))}
              </FormGroup>
            </CardBody>
          </Card>
        );
      default:
        return "";
    }
  });

  const onChangeElementType = (event) => {
    setOptions([
      <Input
        style={{ marginBottom: "5px" }}
        name="question"
        placeholder="Option"
        type="text"
        className="inputText"
        required
      />,
    ]);
    const type = event.target.value;
    if (type === "Checkboxes" || type === "Multiple Choice") {
      setHidden(false);
    } else {
      setHidden(true);
    }
  };

  const OnClickAddOptionButton = () => {
    setOptions(
      options.concat(
        <Input
          style={{ marginBottom: "5px" }}
          name="option"
          placeholder="Option"
          type="text"
          className="inputText"
          required
        />
      )
    );
  };

  const OnClickDeleteOptionButton = () => {
    if (options.length > 1)
      setOptions(
        options.filter((element, index) => index < options.length - 1)
      );
  };

  const toggle = () => {
    setSweetalertUpdate(!sweetalertUpdate);
  };

  const onClickExport = () => {
    toggle();
  };

  const updateFormApiRequest = async (form) => {
    const api = API_Config.url;
    const token = await getTokenSilently();

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    const newFormData = { title: form.title, description: form.description };

    await axios
      .patch(`${api}/forms/${form.id}/`, newFormData, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        notify(error, "danger");
        console.error(error);
      });
  };

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
                className={isAnswersPageActive ? "btn-info" : "btn-secondary"}
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
                className={isAnswersPageActive ? "btn-secondary" : "btn-info"}
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
                      onBlur={(e) => {
                        form.title = e.target.value;
                        setForm(form);
                        updateFormApiRequest(form);
                      }}
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
                      onBlur={(e) => {
                        form.description = e.target.value;
                        setForm(form);
                        updateFormApiRequest(form);
                      }}
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
                  <Form onSubmit={onSaveFormElement}>
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
                    {!hidden && (
                      <FormGroup>
                        <Row>
                          <Col md="7">
                            {options.map((key, i) => (
                              <Input
                                key={i}
                                style={{ marginBottom: "5px" }}
                                name={`option_${i}`}
                                placeholder="Option"
                                type="text"
                                className="inputText"
                                required
                              />
                            ))}
                          </Col>
                          <Col md="2">
                            <ButtonGroup float="right">
                              <Button
                                type="button"
                                onClick={OnClickAddOptionButton}
                                size="sm"
                              >
                                +
                              </Button>
                              <Button
                                type="button"
                                onClick={OnClickDeleteOptionButton}
                                className="btn-danger"
                                size="sm"
                              >
                                -
                              </Button>
                            </ButtonGroup>
                          </Col>
                        </Row>
                      </FormGroup>
                    )}
                    <Row className="text-center">
                      <Col md="6">
                        {isFieldAdded ? (
                          <Button>Add</Button>
                        ) : (
                          <Button disabled>
                            <img src={loading} alt="loading" />
                          </Button>
                        )}
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
                    <Col md="12">
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
