import React, { Component } from "react";
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
          <a href="register.html" className="btn btn-lg btn-light mt-5 mr-2">
            Sign Up
          </a>
          <a href="login.html" className="btn btn-lg btn-light mt-5">
            Login
          </a>
        </div>
      </div>
    );
  }
}

export default Landing;
