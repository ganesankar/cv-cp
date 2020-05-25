import React, { Component } from "react";
import netlifyIdentity from "netlify-identity-widget";
let user = {};
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
    };
  }
  componentDidMount() {
    // Fetch all todos
  }
  render() {
    console.log(this.props);
    user = netlifyIdentity.currentUser();
    return (
      <div className="app">
        <div className="jumbotron">
          <div className="container">
            <h1 className="">
              Welcome{" "}
              {user && user.user_metadata && user.user_metadata.full_name}!
            </h1>
            <p></p>
            <p></p>
          </div>
        </div>
        <div className="full-page lock-page">
          <div className="content">
            <div className="container">
              <div className="ml-auto mr-auto col-md-6 col-lg-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
