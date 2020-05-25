import React, { Component } from "react";
import { Input, FormGroup } from "reactstrap";

export default class FormGroupInput extends Component {
  onFieldChange(event) {
    // for a regular input field, read field name and value from the event
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    this.props.onInputChange(fieldName, fieldValue);
  }

  renderSwitch(param) {
    switch (param) {
      case "text":
        return (
          <Input
            type="text"
            value={this.props.nameValue || ""}
            name={this.props.name || ""}
            onChange={this.onFieldChange.bind(this)}
          />
        );
      case "date":
        return (
          <Input
            type="date"
            value={this.props.nameValue || ""}
            name={this.props.name || ""}
            onChange={this.onFieldChange.bind(this)}
          />
        );
      case "number":
        return (
          <Input
            type="number"
            value={this.props.nameValue || ""}
            name={this.props.name || ""}
            onChange={this.onFieldChange.bind(this)}
          />
        );
      case "textarea":
        return (
          <textarea
            name={this.props.name || ""}
            className="form-control"
            onChange={this.onFieldChange.bind(this)}
          >
            {this.props.nameValue || ""}
          </textarea>
        );
      default:
        return "foo";
    }
  }

  render() {
    return (
      <React.Fragment>
        <FormGroup>
          <label>{this.props.label || ""}</label>
          {this.renderSwitch(this.props.type || "text")}
        </FormGroup>
      </React.Fragment>
    );
  }
}
