import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deleteJob } from "../../actions/jobActions";

import "../../styles/jobs.css";

class Jobs extends Component {
  onDelete(id) {
    this.props.deleteJob(id);
  }

  render() {
    const jobs = this.props.myJobs.map(job => (
      <tr key={job._id}>
        {/* <Link to={{ pathname: `/notes/${job._id}` }}> */}
        <td>{job.company}</td>
        {/* </Link> */}
        <td>{job.position}</td>
        <td>{job.location}</td>
        <td>{job.status}</td>
        <td>{job.contactName}</td>
        <td>{job.contactEmail}</td>
        <td>{job.contactPhone}</td>
        <td>
          <Link
            to={{
              pathname: `/notes/${job._id}`,
              state: { myjobs: this.props.myJobs }
            }}
            className="btn btn-info"
          >
            Notes
          </Link>
        </td>
        <td>
          <Link
            to={{
              pathname: `/edit-job/${job._id}`,
              state: { myjobs: this.props.myJobs }
            }}
            className="btn btn-success"
          >
            Edit
          </Link>
        </td>
        <td>
          <button
            onClick={this.onDelete.bind(this, job._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div id="widen">
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
              <th />
              <th />
            </tr>
            {jobs}
          </thead>
        </table>
      </div>
    );
  }
}

Jobs.propTypes = {
  deleteJob: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteJob }
)(Jobs);
