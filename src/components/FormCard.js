import React from "react";
import { Row } from "reactstrap";
import { Link } from "react-router-dom";

const FormCard = (props) => {
  const truncate = (str) => {
    return str.length > 20 ? str.substring(0, 20) + "..." : str;
  };

  return (
    <div className="font-icon-detail">
      <Link to={`/form/${props.id}`} className="simple-text logo-mini">
        <i className="tim-icons icon-alert-circle-exc" />
        <p style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
          {truncate(props.title)}
        </p>
      </Link>
      <Row>
        <div className="cardFooter">
          <div
            onClick={() => props.onClickRename(props.id, props.title)}
            className="cardMiniButton"
          >
            &#x270E;
          </div>
          <div
            onClick={() => props.onClickRemove(props.id)}
            className="cardMiniButton"
          >
            X
          </div>
        </div>
      </Row>
    </div>
  );
};

export default FormCard;
