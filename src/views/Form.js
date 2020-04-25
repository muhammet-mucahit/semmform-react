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

import formData from "utils/formData";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: null,
    };
  }

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    for (var i in formData) {
      console.log(formData[i].id, params.formId);
      if (formData[i].id == params.formId) {
        this.setState({
          form: formData[i],
        });
        break;
      }
    }
  }

  render() {
    const { form } = this.state;
    if (form === null) return <p>Loading ...</p>;
    return (
      <div className="content">
        <div className="form text-center">
          <Card>
            <CardBody>{form.title}</CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default Form;
