import React, { Component } from "react";

import { Row, Col, Card, CardText, CardTitle, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import contentData from "../utils/contentData";

class FormCard extends Component {
  render() {
    return (
      <Card body inverse color="primary">
        <CardTitle>Special Title Treatment</CardTitle>
        <CardText>
          With supporting text below as a natural lead-in to additional content.
        </CardText>
        <Button color="secondary">Button</Button>
      </Card>
    );
  }
}

export default FormCard;
