import React from "react";
import { Card, CardBody } from "reactstrap";
import FormBuilder from "react-form-builder2";
// import axios from "axios";
// import Loading from "components/Loading";
// import API_Config from "api_config.json";
// import { useAuth0 } from "react-auth0-spa";
// import Page404 from "views/404";

const NewForm = (props) => {
  // const [form, setForm] = useState(null);
  // const [isBusy, setIsBusy] = useState(true);
  // const { getTokenSilently } = useAuth0();

  // useEffect(() => {
  //   const getFormDetail = async (id) => {
  //     const api = API_Config.url;
  //     const token = await getTokenSilently();

  //     const headers = {
  //       Accept: "application/json",
  //       Authorization: `Bearer ${token}`,
  //     };

  //     await axios
  //       .get(`${api}/forms/${id}`, {
  //         headers: headers,
  //       })
  //       .then((response) => {
  //         setForm(response.data);
  //         setIsBusy(false);
  //       })
  //       .catch((error) => {
  //         // notify(error, "danger");
  //         setIsBusy(false);
  //         console.error(error);
  //       });
  //   };
  //   getFormDetail(params.formId);
  // }, [getTokenSilently, params.formId]);

  // if (isBusy) {
  //   return <Loading />;
  // }

  // if (!form) {
  //   return <Page404 />;
  // }

  return (
    <div className="content">
      <FormBuilder.ReactFormBuilder />
      {/* <div className="row clearfix">
        <div className="col-md-6">
          <h5 style={{ color: "white" }}>Drag & Drop components</h5>
          <hr></hr>
          <div className="tabbable">
            <ul className="nav nav-tabs" id="formtabs"></ul>
            <form className="form-horizontal" id="components" role="form">
              <fieldset>
                <div className="tab-content"></div>
              </fieldset>
            </form>
          </div>
        </div>
        <div className="col-md-6">
          <div className="clearfix">
            <h5 style={{ color: "white" }}>Your Form</h5>
            <hr></hr>
            <div id="build">
              <form id="target" className="form-horizontal"></form>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default NewForm;
