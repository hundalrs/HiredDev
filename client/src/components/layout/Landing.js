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
      login: false,
      about: false
    };

    this.onSignup = this.onSignup.bind(this);
    this.onSignupClose = this.onSignupClose.bind(this);
    this.onSignupCloseAndLogin = this.onSignupCloseAndLogin.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onLoginClose = this.onLoginClose.bind(this);
    this.onAbout = this.onAbout.bind(this);
    this.onAboutClose = this.onAboutClose.bind(this);
  }

  onSignup(e) {
    this.setState({ signup: true });
  }

  onSignupClose(e) {
    this.setState({ signup: false });
  }

  onSignupCloseAndLogin(e) {
    this.setState({ signup: false });
    setTimeout(() => {
      this.setState({ login: true });
    }, 700);
  }

  onLogin(e) {
    this.setState({ login: true });
  }

  onLoginClose(e) {
    this.setState({ login: false });
  }

  onAbout(e) {
    this.setState({ about: true });
  }

  onAboutClose(e) {
    this.setState({ about: false });
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    const { signup, login, about } = this.state;

    let modal;

    if (signup === true) {
      modal = (
        <div className="bg-modal">
          <div className="modal-content-signup">
            <div className="close" onClick={this.onSignupClose}>
              +
            </div>
            <Register signupAndClose={this.onSignupCloseAndLogin} />
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
    } else if (about === true) {
      modal = (
        <div className="bg-modal">
          <div className="modal-content-about">
            <div className="close" onClick={this.onAboutClose}>
              +
            </div>
            <h1 style={{ color: "black" }}>About HiredDev</h1>
            <h6 className="about">
              HiredDev is a tool for developers to organize their job search by
              tracking their applications and interviews. Often, devs apply to
              many jobs, and HiredDev offers to alleviate that stress with a
              secure dashboard that will store your status and notes on any jobs
              you apply to.
            </h6>
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
            <Link to="/" className="btn btn-white" onClick={this.onAbout}>
              About HiredDev
            </Link>
            <br />
            <br />
            <br />
          </div>
          <Link
            to="/"
            className="login-link btn-landing btn-login"
            onClick={this.onLogin}
            style={{ textDecoration: "none" }}
          >
            Log In
          </Link>
          <Link
            to="/"
            className="signup-link btn-landing btn-signup"
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
