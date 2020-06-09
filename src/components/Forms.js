import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import FormCard from "./FormCard";
import SweetAlert from "react-bootstrap-sweetalert";
import { notify } from "utils/notification";
import { useAuth0 } from "react-auth0-spa";
import empty_forms from "assets/empty_forms.svg";
import API_Config from "api_config.json";
import axios from "axios";

const Forms = (props) => {
  const [showSweetalertUpdate, setShowweetalertUpdate] = useState(false);
  const [form, setForm] = useState({ id: "", title: "" });
  const { forms, setForms } = props;
  const { getTokenSilently } = useAuth0();

  const toggle = () => {
    setShowweetalertUpdate(!showSweetalertUpdate);
  };

  const deleteFormApiRequest = async (id) => {
    const api = API_Config.url;
    const token = await getTokenSilently();

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    await axios
      .delete(`${api}/forms/${id}/`, {
        headers: headers,
      })
      .catch((error) => {
        notify(error, "danger");
        console.error(error);
      });
  };

  const onClickRemove = (formId) => {
    setForms(forms.filter((i) => i.id !== formId));
    notify("The form deleted successfully", "info");
    deleteFormApiRequest(formId);
  };

  const updateFormApiRequest = async (newTitle) => {
    const api = API_Config.url;
    const token = await getTokenSilently();

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    const newTitleData = { title: newTitle };

    await axios
      .patch(`${api}/forms/${form.id}/`, newTitleData, {
        headers: headers,
      })
      .catch((error) => {
        notify(error, "danger");
        console.error(error);
      });
  };

  const onClickRename = (form) => {
    setForm(form);
    toggle();
  };

  const onRename = (newTitle) => {
    for (var i in forms) {
      if (forms[i].id === form.id) {
        forms[i].title = newTitle;
        break;
      }
    }
    notify("The form renamed successfully", "success");
    updateFormApiRequest(newTitle);
    toggle();
  };

  return (
    <div className="next-steps">
      {forms.length > 0 ? (
        <Row>
          {forms.map((col, i) => (
            <Col
              key={i}
              className="font-icon-list col-xs-6 col-xs-6"
              lg="2"
              md="3"
              sm="4"
            >
              <FormCard
                id={col.id}
                title={col.title}
                onClickRename={onClickRename}
                onClickRemove={onClickRemove}
              />
            </Col>
          ))}
          <SweetAlert
            show={showSweetalertUpdate}
            input
            showCancel
            cancelBtnBsStyle="danger"
            confirmBtnBsStyle="info"
            title="Rename"
            onConfirm={(newTitle) => onRename(newTitle)}
            onCancel={toggle}
          >
            Please enter a new name for the item
          </SweetAlert>
        </Row>
      ) : (
        <div style={{ textAlign: "center" }}>
          <img className="warning" src={empty_forms} alt="No Forms" />
          <h3>No Forms Found</h3>
        </div>
      )}
    </div>
  );
};

export default Forms;
