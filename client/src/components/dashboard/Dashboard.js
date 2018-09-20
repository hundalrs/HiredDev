import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentJobs } from "../../actions/jobActions";
import Spinner from "../common/Spinner";
import Jobs from "./Jobs";
import "../../styles/dashboard.css";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      query: ""
    };

    this.onNewSearch = this.onNewSearch.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentJobs();
  }

  onNewSearch(e) {
    this.setState({ query: e.target.value });
  }

  render() {
    const { user } = this.props.auth;
    const { jobs, loading } = this.props.jobs;
    const { query } = this.state;

    let dashboardContent;

    if (jobs === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has jobs data
      if (Object.keys(jobs).length > 0) {
        dashboardContent = (
          <div>
            <input
              onChange={this.onNewSearch}
              type="text"
              placeholder="Search Company"
              className="search-bar"
            />
            <br />
            <Jobs myJobs={jobs.allJobs} query={query} />
          </div>
        );
      } else {
        // User logged in but has no jobs
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not entered any jobs yet</p>
            <Link to="/add-job" className="btn btn-lg btn-info mb-2">
              Add Job
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <h1 className="mt-4">Dashboard</h1>
        {dashboardContent}
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentJobs: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  jobs: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  jobs: state.jobs,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentJobs }
)(Dashboard);
