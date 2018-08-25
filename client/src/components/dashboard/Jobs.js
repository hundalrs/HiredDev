import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class Jobs extends Component {
  render() {
    const jobs = this.props.myJobs.map(job => (
      <tr key={job._id}>
        <td>{job.company}</td>
        <td>{job.position}</td>
        <td>{job.location}</td>
        <td>{job.status}</td>
        <td>{job.contactName}</td>
        <td>{job.contactEmail}</td>
        <td>{job.contactPhone}</td>
        <td>
          <button className="btn btn-danger">Delete</button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-4">Job Applications</h4>
        <Link to="/add-job" className="btn btn-sm btn-info mb-4">
          Add Job
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Location</th>
              <th>Status</th>
              <th>Contact Name</th>
              <th>Contact Email</th>
              <th>Contact Phone</th>
              <th />
            </tr>
            {jobs}
          </thead>
        </table>
      </div>
    );
  }
}

export default connect(null)(withRouter(Jobs));
