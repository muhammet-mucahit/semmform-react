import React from "react";

import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

import Forms from "components/Forms";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardBody className="all-icons">
                <Forms />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h3 className="title">My Forms</h3>
              </CardHeader>
              <CardBody className="all-icons"></CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
