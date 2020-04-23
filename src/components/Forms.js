import React, { Component } from "react";

import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import formData from "../utils/formData";
import FormCard from "./FormCard";

class Forms extends Component {
  render() {
    return (
      <div className="next-steps my-5">
        <h2 className="my-5 text-center">Forms</h2>
        <Row className="d-flex justify-content-between">
          {formData.map((col, i) => (
            <Col key={i} md={2} className="mb-4">
              <FormCard />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default Forms;
