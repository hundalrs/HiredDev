import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearJobs } from "../../actions/jobActions";

import "../../styles/navbar.css";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
    this.props.clearJobs();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
            style={{ width: "25px", marginRight: "5px" }}
          >
            {" "}
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = <ul className="navbar-nav ml-auto" />;

    return (
      <nav className="navbar navbar-custom navbar-expand-sm navbar-dark bg-dark mb-0">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Hired Dev
          </Link>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

Navbar.proptypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearJobs }
)(Navbar);
