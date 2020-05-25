import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

class BreadCrumbGen extends Component {
  render() {
    const { list } = this.props;
    const listlength = list.length || 0;
    return (
      <React.Fragment>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          {list &&
            list.length > 0 &&
            list.map((listItem, index) => {
              return (
                <React.Fragment key={index}>
                  {index === listlength ? (
                    <BreadcrumbItem active>
                      Edit : {listItem.name}
                    </BreadcrumbItem>
                  ) : (
                    <BreadcrumbItem>
                      <Link to= {listItem.link}> {listItem.name}</Link>
                    </BreadcrumbItem>
                  )}
                </React.Fragment>
              );
            })}
        </Breadcrumb>
      </React.Fragment>
    );
  }
}

BreadCrumbGen.propTypes = {
  list: PropTypes.any
};

export default connect()(BreadCrumbGen);
