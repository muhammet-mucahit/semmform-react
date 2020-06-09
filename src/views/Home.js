import React from "react";
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import Forms from "components/Forms";

const Home = (props) => {
  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <h3 className="title">My Forms</h3>
            </CardHeader>
            <CardBody className="all-icons">
              <Forms forms={props.forms} setForms={props.setForms} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
