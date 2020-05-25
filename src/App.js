import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import netlifyIdentity from "netlify-identity-widget";
import { ToastsContainer, ToastsStore } from "react-toasts";
import "./App.css";
import AdminFooter from "./components/Footers/AdminFooter.js";
import Header from "./components/Header/Header";

import Home from "./views/Home";
import PagesList from "./views/PagesList";

import routes from "./routes.js";
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
    netlifyIdentity.init();
  }
  componentDidMount() {
    // Fetch all todos
    const user = netlifyIdentity.currentUser();
    if (user) this.setState({ user });
  }
  login = () => {
    netlifyIdentity.ctx = this;
    console.log("loging...");
    netlifyIdentity.open();
    netlifyIdentity.on("login", (user) => {
      ToastsStore.success(`Logged in Succesfully`);
      netlifyIdentity.ctx.setState({ user });
      netlifyIdentity.close();
      //setTimeout(() => navigate("/"), 400);
    });
  };

  logout = () => {
    netlifyIdentity.ctx = this;
    console.log("logout...");
    netlifyIdentity.logout();
    netlifyIdentity.on("logout", () => {
      ToastsStore.success(`Logged out Succesfully`);
      netlifyIdentity.ctx.setState({ user: null });
    });
  };
  render() {
    return (
      <div className="bg-light rootapp">
        <ToastsContainer store={ToastsStore} />
        <BrowserRouter>
          {this.state.user ? (
            <div>
              {/**
              *  <p>Welcome: {this.state.user.user_metadata.full_name}</p>
              <button onClick={this.logout}>Log out</button>
              */}

              <Header
                {...this.props}
                user={this.state.user.user_metadata.full_name}
                logout={this.logout}
                routes={routes}
              />
              <div className="main-content">
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={Home}
                    user={this.state.user.user_metadata.full_name}
                  />
                  <Route exact path="/pages-list" component={PagesList} />
                </Switch>
              </div>
              <AdminFooter />
            </div>
          ) : (
            <div className="formSignin text-center">
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
              <button
                className="btn btn-lg btn-primary btn-block"
                onClick={this.login}
              >
                Log in
              </button>
            </div>
          )}
        </BrowserRouter>
      </div>
    );
  }
}
