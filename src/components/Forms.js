import React, { Component } from "react";

import { Row, Col } from "reactstrap";
import formData from "../utils/formData";
import FormCard from "./FormCard";
import SweetAlert from "react-bootstrap-sweetalert";

class Forms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: formData,
      sweetalertUpdate: false,
      id: -1,
      title: "",
    };
  }

  onClickRename = (id, title) => {
    console.log(id, title);
    this.setState({
      id: id,
      title: title,
    });
    this.toggle();
  };

  toggle = () => {
    this.setState({
      sweetalertUpdate: !this.state.sweetalertUpdate,
    });
  };

  onClickRemove = (formId) => {
    this.setState({
      formData: this.state.formData.filter((i) => i.id !== formId),
    });
  };

  onRename = (newTitle) => {
    for (var i in formData) {
      if (formData[i].id === this.state.id) {
        formData[i].title = newTitle;
        break;
      }
    }
    this.toggle();
  };

  render() {
    return (
      <div className="next-steps">
        <Row>
          {this.state.formData.map((col, i) => (
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
                onClickRename={this.onClickRename}
                onClickRemove={this.onClickRemove}
              />
            </Col>
          ))}
        </Row>
        <SweetAlert
          show={this.state.sweetalertUpdate}
          input
          showCancel
          defaultValue={this.state.title}
          cancelBtnBsStyle="danger"
          confirmBtnBsStyle="info"
          title="Rename"
          onConfirm={(response) => this.onRename(response)}
          onCancel={this.toggle}
        >
          Please enter a new name for the item
        </SweetAlert>
      </div>
    );
  }
}

export default Forms;
