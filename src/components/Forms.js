import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import FormCard from "./FormCard";
import SweetAlert from "react-bootstrap-sweetalert";
import { notify } from "utils/notification";
import { useAuth0 } from "react-auth0-spa";
import axios from "axios";
import Loading from "components/Loading";
import API_Config from "api_config.json";

const Forms = () => {
  const { isAuthenticated, getTokenSilently } = useAuth0();
  const [userForms, setUserForms] = useState([]);
  const [isBusy, setIsBusy] = useState(true);
  const [sweetalertUpdate, setSweetalertUpdate] = useState(false);
  const [title, setTitle] = useState("");
  const [id, setId] = useState(-1);

  useEffect(() => {
    const getUserForms = async () => {
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
          setUserForms(response.data);
          setIsBusy(false);
        })
        .catch((error) => {
          notify(error, "danger");
          console.error(error);
        });
    };
    getUserForms();
  }, [getTokenSilently]);

  if (isAuthenticated && isBusy) {
    return <Loading />;
  }

  const onClickRename = (id, title) => {
    setId(id);
    setTitle(title);
    toggle();
  };

  const toggle = () => {
    setSweetalertUpdate(!sweetalertUpdate);
  };

  const deleteForm = async (id) => {
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
      .then(() => {
        setIsBusy(false);
        notify("The form deleted successfully!", "success");
      })
      .catch((error) => {
        notify(error, "danger");
        console.error(error);
      });
  };

  const onClickRemove = (formId) => {
    setUserForms(userForms.filter((i) => i.id !== formId));
    deleteForm(formId);
  };

  const onRename = async (newTitle) => {
    for (var i in userForms) {
      if (userForms[i].id === id) {
        userForms[i].title = newTitle;
        break;
      }
    }
    toggle();

    const api = API_Config.url;
    const token = await getTokenSilently();

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    await axios
      .patch(
        `${api}/forms/${id}/`,
        { title: newTitle },
        {
          headers: headers,
        }
      )
      .then(() => {
        setIsBusy(false);
        notify("The form renamed successfully!", "success");
      })
      .catch((error) => {
        setIsBusy(false);
        notify(error, "danger");
        console.error(error);
      });
  };

  return (
    <Row>
      <Col md="12">
        <Card>
          <CardHeader>
            <h3 className="title">My Forms</h3>
          </CardHeader>
          <CardBody className="all-icons">
            <div className="next-steps">
              <Row>
                {userForms.map((col, i) => (
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
              </Row>
              <SweetAlert
                show={sweetalertUpdate}
                input
                showCancel
                defaultValue={title}
                cancelBtnBsStyle="danger"
                confirmBtnBsStyle="info"
                title="Rename"
                onConfirm={(response) => onRename(response)}
                onCancel={toggle}
              >
                Please enter a new name for the item
              </SweetAlert>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Forms;
