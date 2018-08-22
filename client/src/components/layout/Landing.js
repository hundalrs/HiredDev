import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../../styles/landing.css";

class Landing extends Component {
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
          <h5>
            Keep track of your applications and organization your job search
            now!
          </h5>
          <Link to="/signup" className="btn btn-lg btn-light mt-5 mr-2">
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-lg btn-light mt-5">
            Login
          </Link>
        </div>
      </div>
    );
  }
}

export default Landing;
