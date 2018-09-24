import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deleteJob } from "../../actions/jobActions";

import "../../styles/jobs.css";

class Jobs extends Component {
  constructor() {
    super();
    this.state = {
      deletion: false,
      confirm: false,
      modal_show: false
    };
    this.onDeleteClose = this.onDeleteClose.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onDelete(id) {
    this.setState({ deletion: true });
    this.setState({ modal_show: true });

    setTimeout(() => {
      if (this.state.confirm === true) {
        this.setState({ modal_show: false });
      }
    }, 700);

    setTimeout(() => {
      if (this.state.confirm === true) {
        this.props.deleteJob(id);
        this.setState({ confirm: false });
        this.setState({ deletion: false });
      }
    }, 2000);
  }

  onConfirm(id) {
    this.setState({ confirm: true });
  }

  onDeleteClose(e) {
    this.setState({ deletion: false });
  }

  render() {
    const { deletion, modal_show } = this.state;

    let modal;

    if (deletion === true) {
      if (modal_show === true) {
        modal = (
          <div className="bg-modal-delete">
            <div className="modal-content-delete">
              <div className="close" onClick={this.onDeleteClose}>
                +
              </div>
              <h2>Are you sure you would like to delete this job?</h2>
              <btn
                className="btn mr-4 mt-4 btn-danger"
                onClick={this.onConfirm}
              >
                Yes
              </btn>
              <btn
                className="btn mt-4 btn-success"
                onClick={this.onDeleteClose}
              >
                No
              </btn>
            </div>
          </div>
        );
      }
    }

    const jobs = this.props.myJobs.map(
      job =>
        job.company.toLowerCase().includes(this.props.query.toLowerCase()) ? (
          <tr key={job._id}>
            <td>{job.company}</td>
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
                className="btn btn-danger delete-button"
              >
                Delete
              </button>
            </td>
          </tr>
        ) : null
    );

    return (
      <div id="widen">
        {/* <h4 className="mb-4">Job Applications</h4> */}
        <Link to="/add-job" className="btn btn-sm btn-info mb-4 my-button">
          Add Job
        </Link>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th style={{ paddingRight: "14px" }}>Company</th>
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
        {modal}
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
