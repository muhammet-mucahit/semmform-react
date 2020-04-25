import React from "react";
import { Button, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const truncate = (str) => {
  return str.length > 20 ? str.substring(0, 20) + "..." : str;
};

const FormCard = (props) => {
  return (
    <div className="font-icon-detail">
      <Link to={`/form/${props.id}`} className="simple-text logo-mini">
        <i className="tim-icons icon-alert-circle-exc" />
        <p style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
          {truncate(props.title)}
        </p>
      </Link>
      <Row>
        <Col>
          <Button
            onClick={() => props.onClickRename(props.id, props.title)}
            className="btn btn-info"
          >
            Rename
          </Button>
        </Col>
        <Col>
          <Button
            onClick={() => props.onClickRemove(props.id)}
            className="btn btn-outline btn-danger"
          >
            Remove
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default FormCard;
