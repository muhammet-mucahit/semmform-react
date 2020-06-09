import React from "react";
import { Row } from "reactstrap";
import { Link } from "react-router-dom";
import { truncate } from "utils/helper";

const FormCard = (props) => {
  return (
    <div className="font-icon-detail">
      <Link to={`/form/${props.id}`} className="simple-text logo-mini">
        <i className="tim-icons icon-notes" />
        <p style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
          {truncate(props.title)}
        </p>
      </Link>

      <Row>
        <div className="cardFooter">
          <div
            onClick={() =>
              props.onClickRename({ id: props.id, title: props.title })
            }
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
