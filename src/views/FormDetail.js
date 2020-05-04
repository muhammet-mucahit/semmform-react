import React, { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
// import { notify } from "utils/notification";
import axios from "axios";
import Loading from "components/Loading";
import API_Config from "api_config.json";
import { useAuth0 } from "react-auth0-spa";
import Page404 from "views/404";

const FormDetail = (props) => {
  const [form, setForm] = useState(null);
  const [isBusy, setIsBusy] = useState(true);
  const { getTokenSilently } = useAuth0();
  const {
    match: { params },
  } = props;

  useEffect(() => {
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
          setIsBusy(false);
        })
        .catch((error) => {
          // notify(error, "danger");
          setIsBusy(false);
          console.error(error);
        });
    };
    getFormDetail(params.formId);
  }, [getTokenSilently, params.formId]);

  if (isBusy) {
    return <Loading />;
  }

  if (!form) {
    return <Page404 />;
  }

  return (
    <div className="content">
      <div className="form text-center">
        <Card>
          <CardBody>{form.title}</CardBody>
        </Card>
      </div>
    </div>
  );
};

export default FormDetail;
