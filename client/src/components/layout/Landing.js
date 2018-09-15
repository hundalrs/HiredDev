import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Register from "../auth/Register";
import Login from "../auth/Login";

import "../../styles/landing.css";

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      signup: false,
      login: false
    };

    this.onSignup = this.onSignup.bind(this);
    this.onSignupClose = this.onSignupClose.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onLoginClose = this.onLoginClose.bind(this);
  }

  onSignup(e) {
    this.setState({ signup: true });
  }

  onSignupClose(e) {
    this.setState({ signup: false });
  }

  onLogin(e) {
    this.setState({ login: true });
  }

  onLoginClose(e) {
    this.setState({ login: false });
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    const { signup, login } = this.state;

    let modal;

    if (signup === true) {
      modal = (
        <div className="bg-modal">
          <div className="modal-content-signup">
            <div className="close" onClick={this.onSignupClose}>
              +
            </div>
            <Register signup={this.onSignupClose} />
          </div>
        </div>
      );
    } else if (login === true) {
      modal = (
        <div className="bg-modal">
          <div className="modal-content-login">
            <div className="close" onClick={this.onLoginClose}>
              +
            </div>
            <Login />
          </div>
        </div>
      );
    }

    return (
      <div className="outer">
        <header className="header">
          <div class="text-box">
            <h1 className="heading-primary">
              <span class="heading-primary-main">HiredDev</span>
              <span class="heading-primary-sub">
                Your tool for the job search
              </span>
            </h1>
            <br />
            <br />
            <br />
          </div>
          <Link
            to="/"
            className="login-link"
            onClick={this.onLogin}
            style={{ textDecoration: "none" }}
          >
            Log In
          </Link>
          <Link
            to="/"
            className="signup-link"
            onClick={this.onSignup}
            style={{ textDecoration: "none" }}
          >
            Sign Up
          </Link>
          {modal}
        </header>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
