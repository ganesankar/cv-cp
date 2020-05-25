import React, { Component } from "react";

export default class CellLinkRenderer extends Component {
  constructor(props) {
    super(props);
    this.openUserEdit = this.openUserEdit.bind(this);
    this.openUserView = this.openUserView.bind(this);
  }

  openUserEdit() {
    const { context, node } = this.props;
    context && context.componentParent.openUserModal(node.data.id);
  }
  openUserView() {
    console.log("openUserView");
    const { context, node } = this.props;
    context && context.componentParent.openUserView(node.data.id);
  }

  renderSwitch(param) {
    const { data } = this.props;
    switch (param) {
      case "action":
        return (
          <button
            onClick={() => this.openUserEdit()}
            className={`btn-icon btn-round btn btn-primary  btn-sm`}
          >
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
          </button>
        );
      case "basic_fName":
      case "basic_title":
      case "basic_Name":
      case "id":
        return (
          <span>
            <span
              onClick={() => this.openUserEdit()}
              className="cursor pointer btn btn-link"
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true"></i>{" "}
              {data.basic_fName}
              {data.basic_title}
              {data.basic_Name}
              {data.id}
            </span>

            {/*
            <NavLink
              className="btn-link btn btn-success"
              to={{ pathname: "/student/" + data.id }}
            >
              {data.name}
            </NavLink> */}
          </span>
        );
      default:
        return param.value;
    }
  }

  render() {
    const { colDef } = this.props;

    return <span>{this.renderSwitch(colDef.field)}</span>;
  }
}
