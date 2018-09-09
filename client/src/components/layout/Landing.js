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
      <div className="container-full-bg">
        <div className="jumbotron text-center">
          <h1 className="main-text display-4 text-center">
            Your Job Search Done Your Way
          </h1>
          <br />
          <br />
          <br />
          <h5 className="margin-to-button">Organize your job search now!</h5>
          <Link to="/signup" className="btn btn-lg btn-info mt-5 mr-2">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-lg btn-info mt-5">
            Login
          </Link>
        </div>
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
