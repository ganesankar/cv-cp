import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class LoadAnimate extends Component {
  render() {
    const { position } = this.props;
    const classIs = position === 'absolute' ? 'loadAbsolute' : 'loadRelative' ;
    return (
      <React.Fragment>
        <div className={classIs}>
          <div className="appLoaderIcon"></div>
        </div>
      </React.Fragment>
    );
  }
}

LoadAnimate.propTypes = {
  position: PropTypes.any
};

export default connect()(LoadAnimate);
