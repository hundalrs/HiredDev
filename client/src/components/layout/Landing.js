import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import "../../styles/landing.css";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
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
            to="/login"
            className="login-link"
            style={{ textDecoration: "none" }}
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="signup-link"
            style={{ textDecoration: "none" }}
          >
            Sign Up
          </Link>
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
